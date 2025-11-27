const fs = require("node:fs");
const path = require("node:path");

const submissionsDir = path.join(__dirname, "../project-submissions");
const projectsFile = path.join(__dirname, "../src/constants/projects.ts");

// Read all files in the submissions directory
fs.readdir(submissionsDir, (err, files) => {
  if (err) {
    console.error("Error reading submissions directory:", err);
    process.exit(1);
  }

  const jsonFiles = files.filter(
    (file) => file.endsWith(".json") && file !== "example.json",
  );

  if (jsonFiles.length === 0) {
    console.log("No new project submissions found.");
    return;
  }

  jsonFiles.forEach((file) => {
    const filePath = path.join(submissionsDir, file);
    const fileContent = fs.readFileSync(filePath, "utf8");

    try {
      const newProject = JSON.parse(fileContent);

      // Read existing projects.ts
      const projectsContent = fs.readFileSync(projectsFile, "utf8");

      // Find the end of the array
      const closingBracketIndex = projectsContent.lastIndexOf("];");

      if (closingBracketIndex === -1) {
        console.error("Could not find closing bracket in projects.ts");
        process.exit(1);
      }

      // Format the new project object
      // We'll use JSON.stringify but then remove the outer braces to insert it nicely if we want,
      // or just insert the whole object with a comma.
      const newProjectString = JSON.stringify(newProject, null, 2);

      // Prepare the insertion string (comma + newline + object)
      // Check if the array is empty or has items to decide on the comma
      // For simplicity, we assume the array is not empty based on the file we saw.
      // We'll add a comma before the new item.

      const insertion = `,\n  ${newProjectString}`;

      // Insert before the closing bracket
      const updatedContent =
        projectsContent.slice(0, closingBracketIndex) +
        insertion +
        projectsContent.slice(closingBracketIndex);

      // Write back to projects.ts
      fs.writeFileSync(projectsFile, updatedContent, "utf8");
      console.log(`Added project from ${file} to projects.ts`);

      // Delete the submission file
      fs.unlinkSync(filePath);
      console.log(`Deleted submission file ${file}`);
    } catch (parseError) {
      console.error(`Error parsing JSON from ${file}:`, parseError);
      process.exit(1);
    }
  });
});
