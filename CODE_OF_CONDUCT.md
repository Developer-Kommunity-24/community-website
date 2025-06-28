# Code of Conduct

Welcome to the DK24 Community! This document outlines expectations for respectful behavior and contribution quality. It is split into two parts:

1. [Community Conduct](#1-community-conduct)
2. [Code Quality Conduct](#2-code-quality-conduct)

---

## 1. Community Conduct

### Our Pledge

We commit to providing a welcoming, safe, and inclusive environment for everyone, regardless of background or identity. We believe in empathy, collaboration, and learning together.

### ✅ Expected Behavior

- Be respectful, supportive, and constructive
- Encourage beginners and foster a growth mindset
- Use inclusive, professional, and welcoming language
- Share knowledge openly and give helpful feedback
- Follow DK24's TEAM model and collaboration principles

### ❌ Unacceptable Behavior

- Harassment, threats, or discriminatory language
- Personal attacks, trolling, or intimidation
- Sharing private info without consent
- Disrupting discussions or events
- Repeatedly ignoring feedback or project norms

### Reporting Issues

Report violations by emailing **[deveeshshetty@gmail.com](mailto:deveeshshetty@gmail.com)**. Include:

- Description of the incident
- Names (optional)
- Screenshots or evidence (if any)
- Date and time

All reports are kept confidential.

### Enforcement

Depending on severity, actions may include:

- Warning
- Temporary or permanent removal
- Request for public or private apology

Appeals can be sent via email.

---

## 2. Code Quality Conduct

This section sets rules for contributing clean, maintainable code to the DK24 codebase.

### ✅ Must Follow

- **Use TypeScript** for all components
- **Avoid `any`** unless absolutely required
- **Use proper file naming** (`kebab-case`, `PascalCase`, etc.)
- **Modularize components** – keep them small and reusable
- **Use semantic Tailwind CSS** – avoid inline styles

### 📁 File Structure

Our project follows a standard Next.js App Router structure within the `src` directory:

```
src/
├── app/          # Next.js App Router: pages and layouts
│   ├── page.tsx
│   └── (routes)/
│       └── page.tsx
├── components/   # Shared React components
│   ├── ui/       # Basic UI elements (e.g., Button, Card)
│   └── navbar.tsx
├── config/       # Site-wide configuration
├── constants/    # Constant data (e.g., navigation links, testimonials)
├── lib/          # Utility functions and libraries
└── types/        # TypeScript type definitions
```

- **`app/`**: Contains all routes and pages, following Next.js App Router conventions.
- **`components/`**: Holds reusable components. UI primitives go in `components/ui/`.
- **`constants/`**: Stores static data arrays and objects.
- **`lib/`**: For helper functions, API calls, and utility code.
- **`types/`**: Global TypeScript type definitions.

### 🧠 Naming Conventions

- Files: `event-card.tsx`
- Interfaces: `EventCardProps`
- Constants: `EVENT_STATUS`

### 🧼 Component Example

```tsx
// ✅ Good
interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
}

export function Button({ children, variant = 'primary' }: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`}>
      {children}
    </button>
  )
}
```

```tsx
// ❌ Avoid
export function Button(props: any) {
  return <button {...props} />
}
```

### 🎨 Tailwind Usage

```tsx
// ✅
<div className="p-4 rounded-md bg-white shadow-sm text-gray-900">
  Hello, DK24!
</div>

// ❌ Avoid
<div style={{ padding: '1rem', backgroundColor: '#fff' }}>
  Hello
</div>
```

### 🧪 Testing & Linting

Before pushing:

```bash
npm run lint         # Check lint issues
npm run build        # Ensure build passes
npm run type-check   # TS validation
```

### ✅ Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org):

Examples:

```bash
feat: add login button component
fix: correct alignment of navbar
docs: update README instructions
```

---

## Final Notes

Following these guidelines helps maintain a professional, scalable, and welcoming space for all contributors. Thank you for keeping DK24 awesome!

*Last Updated: June 2025*
*Contact: [deveeshshetty@gmail.com](mailto:deveeshshetty@gmail.com)*
