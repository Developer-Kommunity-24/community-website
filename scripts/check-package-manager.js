#!/usr/bin/env node

const userAgent = process.env.npm_config_user_agent;

if (!userAgent) {
  // Cannot determine package manager, allow it
  process.exit(0);
}

if (!userAgent.startsWith("npm")) {
  console.error(
    "\n\x1b[31m✗ Error: This project requires npm as the package manager.\x1b[0m",
  );
  console.error("\x1b[33m  Please use: npm install\x1b[0m\n");
  process.exit(1);
}
