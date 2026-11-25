const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const envPath = path.join(__dirname, "..", ".env.local");

// Check for already existing .env.local file
if (fs.existsSync(envPath)) {
  console.log(".env.local file already exists. Skipping creation.");
  process.exit(0);
}

// Helper function to generate a cryptographic value
const generateSecret = () => {
  return crypto.randomBytes(16).toString("hex");
};

// Sample Template for env files - More can be added
const envTemplate = `NEXT_PUBLIC_SITE_URL=http://localhost:3000
BACKEND_URL=http://localhost:8080
BACKEND_SECRET_KEY=${generateSecret()}
REVALIDATION_SECRET=${generateSecret()}
`;

try {
  // Preventing File write failure - wrapped in a try-catch block
  fs.writeFileSync(envPath, `${envTemplate.trim()}\n`);
  console.log("Created .env.local with required secrets!");
} catch (error) {
  console.error("Failed to create .env.local:", error.message);
  process.exit(1);
}
