# Contributing to AI Puzzle Adventure

## Development Workflow

### 1. Project Setup

- Fork and clone the repository
- Install dependencies: `npm install`
- Copy `.env.example` to `.env` and fill in required values:
  ```
  OPENROUTER_API_KEY=your_key_here
  OPENROUTER_API_TOKEN=your_token_here
  ```

### 2. Branch Naming Convention

- Feature: `feature/brief-description`
- Bug fix: `fix/brief-description`
- Documentation: `docs/brief-description`

### 3. Commit Message Format

```
type(scope): subject

- type: feat|fix|docs|style|refactor|test|chore
- scope: auth|game|ui|api|etc
- subject: clear, concise description
```

### 4. Pull Request Process

1. Create feature branch from `main`
2. Implement changes
3. Run tests and linting
4. Submit PR with clear description
5. Address review feedback
6. Maintain updated with `main`

## Project Structure

```
/
├── app/              # Next.js App Router pages
├── components/       # React components
├── lib/             # Utility functions
├── public/          # Static assets
└── prisma/          # Database schema
```

## Development Rules

### 1. Code Quality

- Write clean, self-documenting code
- Add comments for complex logic
- Follow project's ESLint and Prettier configs
- Use TypeScript for type safety

### 2. Testing

- Write unit tests for utils and components
- Add integration tests for critical paths
- Maintain >80% code coverage

### 3. Performance

- Optimize bundle size
- Implement proper loading states
- Use proper image optimization
- Follow Next.js best practices

### 4. Security

- Never commit sensitive data
- Validate all user inputs
- Implement proper error handling
- Follow OWASP guidelines

## MVP Checklist

### Phase 1: Core Game Setup

- [ ] Project scaffolding with Next.js 14+
- [ ] Basic game canvas with Phaser.js
- [ ] Player movement controls
- [ ] Simple level layout rendering
- [ ] Basic collision detection

### Phase 2: AI Integration

- [ ] OpenRouter API setup
- [ ] Local fallback generation
- [ ] Basic level generation
- [ ] Difficulty adjustment stub

### Phase 3: Game Features

- [ ] Score tracking
- [ ] Timer implementation
- [ ] Level completion logic
- [ ] Basic animations
- [ ] Sound effects

### Phase 4: User Interface

- [ ] Main menu
- [ ] Game HUD
- [ ] Level select
- [ ] Settings panel
- [ ] Score display

### Phase 5: Data Persistence

- [ ] SQLite setup (local dev)
- [ ] Prisma schema
- [ ] Basic CRUD operations
- [ ] Score saving
- [ ] Level caching

### Phase 6: Polish & Launch

- [ ] Responsive design
- [ ] Loading states
- [ ] Error handling
- [ ] Documentation
- [ ] Deployment setup

## Progress Tracking

### Currently Working On

- Project setup and infrastructure
- Basic game mechanics implementation
- AI integration preparation

### Up Next

- User interface components
- Level generation system
- Database integration

### Completed

- Project documentation
- Architecture planning
- Repository setup

## Getting Help

- Check existing issues first
- Use issue templates
- Join project discussions
- Tag maintainers when stuck
