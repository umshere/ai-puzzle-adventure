# AI Code Generation Prompt: AI-Assisted Creative Puzzle Adventure

## **Objective:**

Generate a local prototype for the **AI-Assisted Creative Puzzle Adventure** game. The generated code should be modular, allowing for future AI enhancements, cloud deployment, and monetization while leveraging free-tier services.

## **Project Requirements:**

### **1. Full-Stack Next.js Application**

- Initialize a **Next.js project** with App Router.
- Use **Phaser.js** to render the game levels inside a canvas element.
- Create a **landing page** with two buttons:
  - "Play Game" (Loads a procedurally generated puzzle level)
  - "Create Level" (Opens a level editor for user-generated content)
- Implement **basic player movement** using touch/swipe gestures or keyboard input.
- UI elements:
  - Game HUD (Timer, Score, Difficulty Indicator)
  - Level completion screen
  - Share button (future integration for viral sharing)

### **2. Next.js API Routes**

- Set up API routes in the Next.js application:
  - `/api/health` → Returns `{ status: "ok" }` for API health checks.
  - `/api/generate` → Calls OpenRouter API or stub function to generate a level.
  - `/api/score` → Accepts player scores and stores them.
- Integrate **OpenRouter API token authentication**:
  - Read API credentials from environment variables (`.env`).
  - Pass `OPENROUTER_API_KEY` and `OPENROUTER_API_TOKEN` in external AI requests.
  - Use `axios` for making AI API calls.

### **3. AI Procedural Level Generation**

- Implement a placeholder function `generateLevel()` that returns a simple level layout.
- Add OpenRouter API integration with fallback to local generation.
- Define level attributes:
  - Tile-based grid layout
  - Obstacles & rewards
  - AI-generated challenges based on player skill level

### **4. Adaptive Difficulty Mechanism**

- Create a function `adjustDifficulty(playerStats)` that:
  - Modifies puzzle complexity based on past performance.
  - Adjusts timer, number of obstacles, and reward frequency.
  - Logs adjustments for debugging.

### **5. Development Environment Setup**

- **Framework:** Next.js 14+ (App Router)
- **Frontend:** React + Phaser.js + TailwindCSS
- **Backend:** Next.js API Routes & Server Actions
- **Database:** SQLite (local development) + Vercel Postgres (production)
- **AI Integration:** OpenRouter API with local fallbacks
- **Deployment:** Vercel (Free Tier)

## **Deliverables:**

- A **working local prototype** with:
  - A **functional game loop** where levels are generated and played.
  - **Basic UI interactions** for starting, playing, and completing levels.
  - **AI procedural generation** with OpenRouter API integration and local fallback.
  - A structured project folder following Next.js conventions.

## **Instructions for AI Code Generator:**

1. **Generate a Next.js application** with Phaser.js integration.
2. **Create API routes** for health checks, level generation, and score submission.
3. **Implement procedural generation** with OpenRouter API integration.
4. **Set up SQLite database** for local development.
5. **Comment the code thoroughly** for easy future modification.
6. **Provide a README** explaining how to run the project locally.

## **Expected Output:**

- `app/` (Next.js App Router pages and components)
- `app/api/` (API routes for backend functionality)
- `lib/` (Utility functions, game logic, AI integration)
- `components/` (React components for UI elements)
- `public/` (Static assets, images, sounds)
- `prisma/` (Database schema and migrations)
- `README.md` (Setup instructions, API documentation)

**Now execute the AI code generation process using this structured prompt. 🚀**
