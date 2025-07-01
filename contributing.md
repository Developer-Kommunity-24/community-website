# 🤝 Contributing to DK24 Community Website

Welcome, developer! 🙌 Whether you're fixing a bug, improving UI, or updating docs — we appreciate your help in building DK24.

---

## 📖 Table of Contents

* [Code of Conduct](#code-of-conduct)
* [Prerequisites & Setup](#prerequisites--setup)
* [Development Guidelines](#development-guidelines)
* [File Structure & Conventions](#file-structure--conventions)
* [Contributing Workflow](#contributing-workflow)
* [Commit & PR Guidelines](#commit--pr-guidelines)
* [Ways to Contribute](#ways-to-contribute)
* [Getting Help](#getting-help)
* [Recognition](#recognition)

---

## Code of Conduct

All contributors are expected to follow our [Code of Conduct](CODE_OF_CONDUCT.md).
Please report unacceptable behavior to [deveeshshetty@gmail.com](mailto:deveeshshetty@gmail.com).

---

## Prerequisites & Setup

### Requirements

* Node.js (v18+)
* npm / yarn / pnpm
* Git
* Code editor (VS Code recommended)

### Getting Started

```bash
# Fork and clone the repo
git clone https://github.com/YOUR_USERNAME/community-website.git
cd community-website

# Add upstream for syncing later
git remote add upstream https://github.com/Developer-Kommunity-24/community-website.git

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Development Guidelines

### Must Follow

* **Use TypeScript** for all components
* **Avoid `any`** unless absolutely needed
* **Use consistent file naming** (`kebab-case`, `PascalCase`, etc.)
* **Modularize components** – keep them small and reusable
* **Use Tailwind CSS classes** – avoid inline styles

### Component Example

```tsx
// ✅ Good
interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
}

export function Button({ children, variant = 'primary' }: ButtonProps) {
  return <button className={`btn btn-${variant}`}>{children}</button>
}
```

```tsx
// ❌ Avoid
export function Button(props: any) {
  return <button {...props} />
}
```

### Tailwind Usage

```tsx
// ✅
<div className="p-4 rounded-md bg-white shadow-sm text-gray-900">
  Hello, DK24!
</div>

// ❌
<div style={{ padding: '1rem', backgroundColor: '#fff' }}>
  Hello
</div>
```

### Testing Before Push

```bash
npm run lint         # Linting
npm run type-check   # TypeScript
npm run build        # Build check
```

---

## File Structure & Conventions

We follow a standard `src/` structure with the Next.js App Router:

```
src/
├── app/          # Pages and layouts
├── components/   # Shared React components
│   └── ui/       # Basic UI primitives
├── config/       # Global config
├── constants/    # Static data like nav links
├── lib/          # Helper functions
└── types/        # TypeScript types
```

### Naming Conventions

* Files: `event-card.tsx`
* Interfaces: `EventCardProps`
* Constants: `EVENT_STATUS`

---

## Contributing Workflow

> 🛑 **Do not start coding directly!**
> Always follow this process to avoid conflicts or wasted work.

### ✅ Steps to Contribute

1. **Find or Create an Issue**

   * Check the [Issues tab](https://github.com/Developer-Kommunity-24/community-website/issues).
   * If **no issue exists**, [create a new one](https://github.com/Developer-Kommunity-24/community-website/issues/new/choose) describing the problem or feature.

2. **Get It Assigned**

   * Comment on the issue:

     > `Hey, I’d like to work on this. Can you assign it to me?`
   * Wait for a maintainer to assign it to you before you begin.

3. **Create a Branch**

   ```bash
   git checkout -b feat/your-feature
   # or
   git checkout -b fix/your-bug
   ```

4. **Code, Lint, Type-Check & Build**

   ```bash
   npm run lint && npm run type-check && npm run build
   ```

5. **Commit Changes**

   ```bash
   git add .
   git commit -m "feat: add login form"
   ```

6. **Push & Create Pull Request**

   ```bash
   git push origin your-branch-name
   ```

   Then [open a PR](https://github.com/Developer-Kommunity-24/community-website/pulls) from your fork.

   Mention related issues with:

   ```md
   Closes #issue_number
   ```

---

## Commit & PR Guidelines

Use [Conventional Commits](https://www.conventionalcommits.org):

```bash
feat: add dark mode support
fix: fix nav layout issue on mobile
docs: update README setup section
```

Include in PR:

* Clear description
* Screenshots (for UI changes)
* Testing info (if applicable)

---

## Ways to Contribute

* **🐛 Report Bugs** – [File a bug](https://github.com/Developer-Kommunity-24/community-website/issues/new?assignees=&labels=bug&template=bug_report.md)
* **✨ Request Features** – [Suggest an idea](https://github.com/Developer-Kommunity-24/community-website/issues/new?assignees=&labels=enhancement&template=feature_request.md)
* **💻 Code Contributions** – Pick [`good first issue`](https://github.com/Developer-Kommunity-24/community-website/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
* **📚 Improve Docs** – Fix typos, missing info, or clarity
* **🎨 UI/UX** – Help polish components or accessibility
* **🌍 Translations** – Help localize the platform

---

## Getting Help

* **GitHub Discussions** – Ask questions or share ideas
* **GitHub Issues** – Report bugs and request features
* **Email** – [deveeshshetty@gmail.com](mailto:deveeshshetty@gmail.com)
* **Community Channels** – See main README

---

## Recognition

Every contributor is valued. You'll be recognized through:

* GitHub contributors list
* Community event shout-outs
* [Contributors page](https://dk24.netlify.app) (coming soon)

---

## Thank You!

Every line of code, bug fix, and idea moves us forward.
We're building DK24 together — and we're glad you're here.

**Happy Contributing!**
