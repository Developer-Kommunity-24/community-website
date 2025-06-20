# Contributing to DK24 Community Website

First off, thank you for considering contributing to DK24! 🎉 It's people like you that make DK24 such a great community. We welcome contributions from everyone, whether you're a student, professional, or just passionate about community building.

## 📖 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Ways to Contribute](#ways-to-contribute)
- [Development Setup](#development-setup)
- [Contribution Workflow](#contribution-workflow)
- [Style Guidelines](#style-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Community Guidelines](#community-guidelines)
- [Getting Help](#getting-help)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to conduct@dk24.org.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 18.0 or later)
- **npm**, **yarn**, or **pnpm**
- **Git**
- A code editor (we recommend **VS Code**)

### First-time Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/community-website.git
   cd community-website
   ```

3. **Add the original repository as upstream**:
   ```bash
   git remote add upstream https://github.com/Developer-Kommunity-24/community-website.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## Ways to Contribute

### 🐛 Bug Reports
Found a bug? Help us fix it!
- Check if the bug has already been reported in [Issues](https://github.com/Developer-Kommunity-24/community-website/issues)
- If not, create a new issue using the bug report template
- Provide as much detail as possible

### ✨ Feature Requests
Have an idea for a new feature?
- Check existing [Issues](https://github.com/Developer-Kommunity-24/community-website/issues) and [Discussions](https://github.com/Developer-Kommunity-24/community-website/discussions)
- Create a new issue using the feature request template
- Explain the problem you're trying to solve

### 💻 Code Contributions
Ready to write some code?
- Look for issues labeled \`good first issue\` or \`help wanted\`
- Comment on the issue to let others know you're working on it
- Follow our development workflow

### 📝 Documentation
Help improve our documentation:
- Fix typos or unclear explanations
- Add examples or tutorials
- Translate documentation to other languages

### 🎨 Design & UI/UX
Improve the user experience:
- Suggest design improvements
- Create mockups or prototypes
- Improve accessibility

### 🌐 Translation
Help make DK24 accessible to more people:
- Translate the website to regional languages
- Review existing translations
- Add localization support

## Development Setup

### Recommended VS Code Extensions
- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **TypeScript Importer**
- **Prettier - Code formatter**
- **ESLint**

### Environment Variables
Create a \`.env.local\` file in the root directory:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# Add other environment variables as needed
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # Run TypeScript checks
```

## Contribution Workflow

### 1. Create a Branch
Always create a new branch for your work:
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
# or
git checkout -b docs/your-documentation-update
```

### 2. Make Your Changes
- Write clean, readable code
- Follow our style guidelines
- Add tests if applicable
- Update documentation if needed

### 3. Test Your Changes
```bash
npm run lint        # Check for linting errors
npm run type-check  # Check for TypeScript errors
npm run build       # Ensure the project builds successfully
```

### 4. Commit Your Changes
Follow our commit message guidelines:
```bash
git add .
git commit -m "feat: add new feature description"
```

### 5. Push and Create Pull Request
```bash
git push origin your-branch-name
```
Then create a pull request on GitHub.

## Style Guidelines

### TypeScript
- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid \`any\` type unless absolutely necessary
- Use meaningful variable and function names

### React Components
```typescript
// ✅ Good
interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
}

export function Button({ children, variant = 'primary', onClick }: ButtonProps) {
  return (
    <button 
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

// ❌ Avoid
export function Button(props: any) {
  return <button {...props} />
}
```

### CSS/Tailwind
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Use semantic class names for custom CSS
- Maintain consistent spacing and typography

```tsx
// ✅ Good
<div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
  <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
    Title
  </h1>
</div>

// ❌ Avoid
<div style={{ padding: '20px', margin: '10px' }}>
  <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
    Title
  </h1>
</div>
```

### File Organization
- Use kebab-case for file names: \`user-profile.tsx\`
- Group related components in folders
- Keep components small and focused
- Use index files for clean imports

```
components/
├── ui/
│   ├── button.tsx
│   ├── card.tsx
│   └── index.ts
├── forms/
│   ├── join-form.tsx
│   └── contact-form.tsx
└── layout/
    ├── navbar.tsx
    └── footer.tsx
```

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Commit Message Format
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools

### Examples
```bash
feat: add user authentication system
fix: resolve mobile navigation menu issue
docs: update contributing guidelines
style: improve button hover animations
refactor: simplify event card component
perf: optimize image loading performance
test: add unit tests for form validation
chore: update dependencies to latest versions
```

## Pull Request Process

### Before Submitting
- [ ] Code follows the project's style guidelines
- [ ] Self-review of the code has been performed
- [ ] Code is commented, particularly in hard-to-understand areas
- [ ] Corresponding changes to documentation have been made
- [ ] Changes generate no new warnings
- [ ] Tests have been added that prove the fix is effective or feature works
- [ ] New and existing unit tests pass locally

### Pull Request Template
When creating a pull request, use our template:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] Added/updated tests
- [ ] All tests pass

## Screenshots (if applicable)
Add screenshots to help explain your changes

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
```

### Review Process
1. **Automated Checks**: CI/CD pipeline runs automatically
2. **Code Review**: At least one maintainer reviews your code
3. **Feedback**: Address any requested changes
4. **Approval**: Once approved, your PR will be merged

## Community Guidelines

### Communication
- **Be respectful** and constructive in all interactions
- **Ask questions** if you're unsure about anything
- **Help others** when you can
- **Use inclusive language** and be welcoming to newcomers

### Collaboration
- **Work together** across college boundaries
- **Share knowledge** and learn from each other
- **Respect different perspectives** and approaches
- **Give credit** where credit is due

### Project-Specific Guidelines
- **Follow the TEAM model** principles in your contributions
- **Consider the impact** on all member colleges
- **Maintain the collaborative spirit** of DK24
- **Think about scalability** and future growth

## Getting Help

### Where to Ask Questions
- **GitHub Discussions**: For general questions and ideas
- **GitHub Issues**: For bug reports and feature requests
- **Discord/Slack**: For real-time chat (links in main README)
- **Email**: For private or sensitive matters

### Mentorship Program
New contributors can request mentorship:
- Comment on issues asking for guidance
- Join our mentorship program
- Attend community office hours
- Connect with experienced contributors

### Resources
- **Next.js Documentation**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **TypeScript Handbook**: [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)
- **Tailwind CSS**: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- **React Documentation**: [https://react.dev/](https://react.dev/)

## Recognition

### Contributors
All contributors are recognized in our:
- **Contributors page** on the website
- **GitHub contributors** section
- **Community events** and announcements
- **Annual reports** and presentations

### Contribution Levels
- **First-time contributor**: Welcome package and recognition
- **Regular contributor**: Special badge and privileges
- **Core contributor**: Invitation to maintainer team
- **Maintainer**: Full access and decision-making power

## License

By contributing to DK24, you agree that your contributions will be licensed under the same [MIT License](../LICENSE) that covers the project.

---

## Thank You! 🙏

Your contributions make DK24 better for everyone. Whether you're fixing a typo, adding a feature, or helping other contributors, every contribution matters.

**Questions?** Don't hesitate to reach out:
- **Email**: contribute@dk24.org
- **GitHub**: Create an issue or discussion
- **Community**: Join our community channels

---

**Happy Contributing!** 🚀

*Made with ❤️ by the DK24 Community*
```