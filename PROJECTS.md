# 📁 Projects

This document explains **how to add a project** to the community by creating a valid [**`project.json`**](./src/data/projects.json) entry.

> [!NOTE]
> Every project **must follow this structure** to be accepted.

## Field Explanations

| Name | Required | Type | Description | Constraints |
| -----|----------|------|-------------|-------------|
| `id` | ✅       | `string` | Unique project identifier (kebab-case recommended)  | **Max 100 characters** |
| `title`| ✅ | `string` | Project name | **Max 200 characters** |
| `description` | ✅ | `string` | Short explanation of the project | **Max 2000 characters** |
| `image` | ✅ | `string` | Image path (usually `/projects/<id>.png`) |
| `tags` | ✅ | `string[]` | Tech stack / keywords | **At least 1 tag required, max 100 chars per tag** |
| `categories` | ✅ | `Category[]` | `"Web"`, `"Mobile"`, `"Tool"` or custom string | **At least 1 category required** |
| `contributors` | ✅ | `Contributor[]` | List of contributors, discriminated by the `kind` field | **At least 1 contributor required** |
| `github` | ❌ | `string` | GitHub repository URL | **Must be a valid URL if provided** |
| `link` | ❌ | `string` | Live demo / website | **Must be a valid URL if provided** |

### Custom Types

> [!IMPORTANT]
> The types shown below are **for reference only**.
> For the authoritative implementation, see [`src/types/project.ts`](./src/types/project.ts).


#### Category
```ts
type Category = "Web" | "Mobile" | "Tool" | (string & {});
```

#### Contributor
```ts
type Contributor =
  | StudentContributor
  | ProfessionalContributor;
```

## Contributors

> [!NOTE]
> Each contributor **must specify `kind`**, which determines the required fields.

```json
"contributors": [Contributor]
```

There are **<u>two</u> valid contributor types**:

### Student Contributor

Use this format if the contributor is a **student**.
```json
{
  "kind": "student",
  "name": "Jane Doe",
  "role": "Frontend Developer",
  "college": "ABC Institute of Technology"
}
```

#### Required Fields

| Field | Type | Constraints |
|-------|------|-------------|
| `kind` | `"student"` | Must be literal `"student"` |
| `name` | `string` | **Max 100 characters** |
| `role` | `string` | **Max 100 characters** |
| `college` | `string` | **Max 200 characters** |

### Professional Contributor

Use this format if the contributor is a **working professional**.
```json
{
  "kind": "professional",
  "name": "John Smith",
  "role": "Backend Engineer",
  "company": "TechCorp Inc."
}
```

#### Required Fields

| Field | Type | Constraints |
|-------|------|-------------|
| `kind` | `"professional"` | Must be literal `"professional"` |
| `name` | `string` | **Max 100 characters** |
| `role` | `string` | **Max 100 characters** |
| `company` | `string` | **Max 200 characters** |


> [!NOTE]
> You can have multiple contributors, including both **student** and **professional** entries.

### Example

```json
{
  "id": "example-project",
  "title": "Example Project",
  "description": "A short description explaining what the project does and why it exists.",
  "image": "/projects/example-project.png",
  "tags": ["React", "TypeScript", "Zod"],
  "categories": ["Web", "Open Source"],
  "contributors": [
    {
      "kind": "student",
      "name": "Jane Doe",
      "role": "Frontend Developer",
      "college": "ABC Institute of Technology"
    },
    {
      "kind": "professional",
      "name": "John Smith",
      "role": "Backend Engineer",
      "company": "TechCorp Inc."
    }
  ],
  "github": "https://github.com/org/example-project",
  "link": "https://example.com"
}
```

### Invalid Examples

#### Missing kind

```json
{
  "name": "Jane Doe",
  "role": "Frontend Developer",
  "college": "ABC Institute of Technology"
}
```

#### Mixing student & professional fields

```json
{
  "kind": "student",
  "name": "Jane Doe",
  "role": "Frontend Developer",
  "company": "TechCorp Inc."
}
```

## Common Mistakes

❌ **Empty arrays**
```json
"tags": [] // Must have at least 1 tag
```

❌ **Invalid URLs**
```json
"github": "github.com/user/repo" // Missing protocol
"link": "http://example.com" // Should use https://
```

❌ **Wrong contributor structure**
```json
{
  "kind": "student",
  "company": "Tech Inc." // Students need 'college', not 'company'
}
```

❌ **Exceeding character limits**
```json
"description": "A very long description..." // Over 2000 chars
```

## Validation

All fields are validated using [Zod schemas](./src/types/project.ts):
- ✂️ **Strings are trimmed** of leading/trailing whitespace
- 🔗 **URLs are validated** and must use proper protocols (`https://`)
- 📦 **Arrays require at least one element** (tags, categories, contributors)
- 📏 **Character limits are strictly enforced** (see Constraints column)
- 🔑 **Discriminated unions** (`kind` field) determine which contributor fields are required

**Validation will fail if:**
- Required fields are missing
- Character limits are exceeded
- URLs are malformed
- Arrays are empty
- Contributor `kind` doesn't match provided fields
