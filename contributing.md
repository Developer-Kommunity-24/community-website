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

## 📜 Code of Conduct

All contributors are expected to follow our [Code of Conduct](CODE_OF_CONDUCT.md).
Please report unacceptable behavior to [dk24consortium@gmail.com](mailto:dk24consortium@gmail.com).

---

## 🧰 Prerequisites & Setup

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

### 🧠 Recommended VS Code Extensions

* **ES7+ React/Redux/React-Native snippets**
* **Tailwind CSS IntelliSense**
* **TypeScript Importer**
* **Biome**

### 🌱 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# Add other environment variables as needed
```

---

## 🛠️ Development Guidelines

### ✅ Must Follow

* Use **TypeScript**
* Avoid `any` unless absolutely necessary
* Follow consistent naming conventions (`kebab-case` for files, `PascalCase` for components)
* Modular, reusable components
* Use **Tailwind CSS** classes instead of inline styles

### ✅ Good Component Example

```tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export function Button({ children, variant = 'primary', onClick }: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}
```

### ❌ Avoid This

```tsx
export function Button(props: any) {
  return <button {...props} />;
}
```

### ✅ Tailwind Usage

```tsx
<div className="p-4 rounded-md bg-white shadow-sm text-gray-900">
  Hello, DK24!
</div>
```

### ❌ Avoid Inline Styling

```tsx
<div style={{ padding: '1rem', backgroundColor: '#fff' }}>
  Hello
</div>
```

### 🔍 Testing Before Push

```bash
npm run lint         # Linting
npm run type-check   # TypeScript checks
npm run build        # Build test
```

---

## 📂 File Structure & Conventions

```bash
src/
├── app/          # Pages and layouts
├── components/   # Shared React components
│   └── ui/       # Basic UI primitives
├── config/       # Global config
├── constants/    # Static data like nav links
├── lib/          # Helper functions
└── types/        # TypeScript types
```

### Naming Rules

* Files: `event-card.tsx`
* Interfaces: `EventCardProps`
* Constants: `EVENT_STATUS`

---

## 🚦 Contributing Workflow

> 🛑 Don’t start coding without an issue and assignment!

### ✅ Step-by-Step

1. **Find or Create an Issue**

   * Look for open issues: [Issues](https://github.com/Developer-Kommunity-24/community-website/issues)
   * If it doesn’t exist, create a new one.

2. **Ask to Be Assigned**

   * Comment:

     > "Hey, I’d like to work on this. Can you assign it to me?"
   * Wait until you’re assigned before starting.

3. **Create a New Branch**

```bash
git checkout -b feat/your-feature-name
# or
git checkout -b fix/your-bug
```

4. **Code, Lint, Type Check, Build**

```bash
npm run lint && npm run type-check && npm run build
```

5. **Commit Your Work**

```bash
git add .
git commit -m "feat: add login form"
```

6. **Push & Create Pull Request**

```bash
git push origin your-branch-name
```

Then open a PR and link the issue like:

```md
Closes #12
```

---

## ✅ Commit & PR Guidelines

Use [Conventional Commits](https://www.conventionalcommits.org):

```bash
feat: add dark mode support
fix: fix nav layout issue on mobile
docs: update README setup section
```

Make sure your PR includes:

* Clear title and description
* UI screenshots (if applicable)
* Lint, type-check, and build passed

---

## 🌟 Ways to Contribute

* 🐛 Bug Fixes
* ✨ New Features
* 📚 Documentation
* 🎨 Design / UI Polish
* 🌍 Translations

### 🚀 Adding a Project
Have a project to showcase? See the [Adding Your Project](README.md#-adding-your-project) section in the README.


---

## ❓ Getting Help

* **GitHub Discussions**
* **Issues tab**
* **Email**: [dk24consortium@gmail.com](mailto:dk24consortium@gmail.com)
* **See README for social links**

---

## 🏆 Recognition

You’ll be recognized via:

* GitHub contributors graph
* Community shout-outs
* Acknowledgement in DK24 events
* Featured on [dk24.org](https://dk24.org) (soon!)

---

## Thank You!

Every contribution counts – no matter how small.
We’re building DK24 together. Glad to have you onboard!

**Happy Contributing! 🚀**
*Made with ❤️ by the DK24 Community*
