#!/usr/bin/env node
/**
 * Compresses staged image files in place (PNG / JPEG / WebP).
 *
 * Intended to run via lint-staged in the pre-commit hook so newly added
 * images are optimized before they are committed.
 *
 * Uses tools available on PATH:
 *   - ImageMagick (magick)  -> resizing + metadata stripping
 *   - jpegoptim             -> lossless JPEG optimization
 *   - optipng               -> lossless PNG optimization
 *
 * Skips files that are already under the size/dimension threshold so the
 * hook stays fast and idempotent. Blog covers that are not 16:9 receive a
 * warning (never a hard failure) so the aspect ratio stays consistent.
 */

const { execFileSync } = require("node:child_process");
const { existsSync, statSync } = require("node:fs");
const { basename } = require("node:path");

const MAX_DIMENSION = Number(process.env.IMAGE_MAX_DIMENSION || 1600);
const MAX_BYTES = Number(process.env.IMAGE_MAX_BYTES || 300 * 1024);
const COVER_RATIO = 16 / 9;
const COVER_RATIO_TOLERANCE = 0.02;

const files = process.argv.slice(2).filter((f) => existsSync(f));

if (files.length === 0) {
  process.exit(0);
}

function run(cmd, args) {
  try {
    execFileSync(cmd, args, { stdio: "ignore" });
  } catch (error) {
    process.stderr.write(`[image-compress] ${cmd} failed: ${error.message}\n`);
  }
}

function dimensions(file) {
  try {
    const out = execFileSync("magick", ["identify", "-format", "%w %h", file], {
      encoding: "utf-8",
    });
    const [w, h] = out.trim().split(/\s+/).map(Number);
    return { w, h };
  } catch {
    return null;
  }
}

function isBlogCover(file) {
  return /(?:^|[/\\])public[/\\]blog[/\\][^/\\]+[/\\]cover\.[^/\\]+$/i.test(
    file,
  );
}

for (const file of files) {
  const ext = basename(file).toLowerCase().split(".").pop();
  const size = statSync(file).size;
  const dim = dimensions(file);

  // Warn (but never block) when a blog cover is not 16:9.
  if (isBlogCover(file) && dim?.w && dim.h) {
    const ratio = dim.w / dim.h;
    if (Math.abs(ratio - COVER_RATIO) > COVER_RATIO_TOLERANCE) {
      process.stderr.write(
        `[image-compress] warning: ${file} is ${dim.w}x${dim.h} (${ratio.toFixed(2)}:1); blog covers should be 16:9 (e.g. 1600x900)\n`,
      );
    }
  }

  // Skip anything already small enough (after the ratio check above).
  if (size <= MAX_BYTES) {
    continue;
  }

  // Resize oversized images down to a sane max dimension.
  if (dim?.w && dim.h) {
    const longest = Math.max(dim.w, dim.h);
    if (longest > MAX_DIMENSION) {
      run("magick", [
        file,
        "-resize",
        `${MAX_DIMENSION}x${MAX_DIMENSION}>`,
        file,
      ]);
    }
  }

  // Strip metadata and optimize per format.
  if (ext === "png") {
    run("magick", [file, "-strip", file]);
    run("optipng", ["-quiet", file]);
  } else if (ext === "jpg" || ext === "jpeg") {
    run("magick", [file, "-strip", file]);
    run("jpegoptim", ["-m60", "--strip-all", file]);
  } else if (ext === "webp") {
    run("magick", [file, "-strip", file]);
  }
}
