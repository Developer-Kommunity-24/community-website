---
name: Project Submission
about: Submit a new project to the showcase
title: "Project Submission: [Project Name]"
labels: "project-submission"
assignees: "dev-shetty, jtuluve, gaureshpai, darshan45672"
---

# Project Submission

**Thank you for submitting your project!**

To ensure your project is added correctly, please follow these steps:

1.  Create a new file in the `project-submissions/` directory.
2.  You can copy `example.json` and rename it to your project ID (e.g., `my-project-id.json`).
3.  Fill in your details.

**Do NOT edit `src/constants/projects.ts` directly.** Our automated workflow will handle that for you after approval.

## Project Details (JSON)

Paste the content of your new JSON file below for quick review:

```json
{
  "id": "your-project-id",
  "title": "Your Project Title",
  "description": "A brief description of your project.",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "image": "/projects/your-image.png",
  "github": "https://github.com/your-username/your-repo",
  "link": "https://your-project-demo.com",
  "contributors": [
    {
      "name": "Your Name",
      "company": "Your Company (Optional)",
      "role": "Your Role (Optional)",
      "college": "Your College (Optional)"
    }
  ]
}
```

## Checklist

- [ ] I have created a new JSON file in `project-submissions/`.
- [ ] The JSON is valid (no trailing commas, correct quotes).
- [ ] I have included a project image in `public/projects/` (if applicable) or provided a valid URL.
- [ ] I have not modified `src/constants/projects.ts` directly.
