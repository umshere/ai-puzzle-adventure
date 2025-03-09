# AI Puzzle Adventure

Repository: https://github.com/umshere/ai-puzzle-adventure/

An AI-powered creative puzzle game leveraging Next.js, OpenRouter API, and free-tier services.

## Project Overview

AI Puzzle Adventure merges puzzle-platformer gameplay with user-driven creativity and advanced AI features. The game leverages OpenRouter API for procedural content generation while maintaining a cost-effective infrastructure.

## Tech Stack

- **Full-Stack Framework**: Next.js 14+ (App Router)
- **Frontend**: React + Phaser.js + TailwindCSS
- **Backend**: Next.js API Routes & Server Actions
- **Database**: SQLite (local) + Vercel Postgres (production)
- **AI Integration**: OpenRouter API with local fallbacks
- **Deployment**: Vercel (Free Tier)

## MCP Servers Research

For optimal AI coding and memory management, we've researched available MCP servers:

### Available MCP Servers

1. **GitHub MCP Server**

   - Provides repository management tools
   - Useful for code version control and collaboration

2. **Git MCP Server**

   - Offers local git operations
   - Helpful for managing branches and commits

3. **UIFlowchartCreator**
   - Analyzes React/Angular repositories
   - Generates UI flow diagrams

### Recommended MCP Servers for AI Coding

For this project, we recommend implementing:

1. **Code Completion MCP Server**

   - Would provide context-aware code suggestions
   - Could reduce token usage by caching common patterns

2. **Memory Management MCP Server**

   - Would store and retrieve large code blocks
   - Could implement vector storage for semantic retrieval

3. **OpenRouter API MCP Server**
   - Would manage API calls to OpenRouter
   - Could implement caching for similar prompts

## Getting Started

1. Clone the repository
2. Copy `.env.example` to `.env` and add your API keys
3. Install dependencies: `npm install`
4. Run development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## Development Roadmap

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed development workflow and MVP checklist.

## License

MIT
