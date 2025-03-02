# AI-Assisted Creative Puzzle Adventure – API & Backend Services (Advanced O1 Update)

## 1. Overview & Purpose

The backend is built with **Node.js & Express**, serving as the central hub for procedural level generation, score submissions, and AI integration via **OpenRouter**. This document provides an **advanced O1-style** blueprint, merging robust AI synergy with a clear expansion path.

---

## 2. API Endpoints

### 2.1. Health Check

**Endpoint:** `GET /api/health`

- **Response:** `{ "status": "ok" }`
- **Purpose:** Quick readiness test. Use for monitoring/DevOps checks.

### 2.2. Generate AI-Powered Level

**Endpoint:** `POST /api/generate`

- **Request Example:**
  ```json
  {
    "playerSkill": 3,
    "theme": "sci-fi"
  }
  ```
- **Response Example:**
  ```json
  {
    "levelId": "abc123",
    "layout": [
      [0, 1, 0],
      [1, 0, 1]
    ],
    "obstacles": [{ "x": 1, "y": 2, "type": "spike" }],
    "difficultyRating": 4
  }
  ```
- **Logic Flow:**
  1. Check for OpenRouter tokens (from `.env`). If valid, call external AI to generate puzzle data.
  2. If tokens missing or AI call fails, use local `generateLevel()` stub.
  3. Return JSON layout describing puzzle structure.

### 2.3. Submit Score

**Endpoint:** `POST /api/score`

- **Request Example:**
  ```json
  {
    "userId": "player123",
    "score": 6200,
    "levelId": "abc123"
  }
  ```
- **Response Example:**
  ```json
  {
    "message": "Score saved successfully",
    "leaderboardPosition": 5
  }
  ```
- **Logic Flow:**
  1. Parse user/score data.
  2. Persist data in local JSON or a database.
  3. Possibly recalc leaderboard, return the user’s new rank.

### 2.4. Editor AI Assist (Future Feature)

**Endpoint:** `POST /api/editor/assist`

- **Request Example:**
  ```json
  {
    "partialLayout": {
      "tiles": [
        [0, 0],
        [1, 1]
      ]
    },
    "targetDifficulty": 5
  }
  ```
- **Response Example:**
  ```json
  {
    "suggestedLayout": {
      "tiles": [
        [0, 1],
        [1, 2]
      ],
      "enemies": [{ "x": 0, "y": 1, "type": "drone" }]
    }
  }
  ```
- **Logic Flow:**
  - AI refines or expands a partially built level. Might place more obstacles, items, or refine difficulty.

### 2.5. User-Created Levels (Future Feature)

**Endpoint:** `GET /api/user-levels/:userId`

- **Response Example:**
  ```json
  [
    {
      "levelId": "xyz678",
      "createdAt": "2025-01-12T10:00:00Z"
    }
  ]
  ```
- **Logic Flow:**
  - Return a list of levels that `:userId` published.
  - Potentially filter or sort by popularity, creation date, etc.

---

## 3. OpenRouter API Integration

### 3.1. Environment Variables

- **.env file:**
  ```bash
  OPENROUTER_API_KEY=your_key_here
  OPENROUTER_API_TOKEN=your_token_here
  ```

### 3.2. Example Usage

```js
const axios = require("axios");

async function callOpenRouter(promptData) {
  if (!process.env.OPENROUTER_API_KEY || !process.env.OPENROUTER_API_TOKEN) {
    console.log("OpenRouter tokens missing, using fallback AI stub.");
    return generateLevelStub();
  }

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_TOKEN}`,
        "X-API-Key": process.env.OPENROUTER_API_KEY,
      },
    };
    const response = await axios.post(
      "https://api.openrouter.ai/generate",
      promptData,
      config
    );
    return response.data;
  } catch (err) {
    console.error("OpenRouter call failed:", err);
    return generateLevelStub();
  }
}
```

### 3.3. Fallback AI Logic

If tokens are not set or the external call fails:

- Use a local `generateLevelStub()` that randomizes puzzle layout.
- Log a warning to indicate the system is in fallback mode.

---

## 4. Data & Storage

### 4.1. Local Persistence (MVP)

- **JSON Files or SQLite** for storing:
  - Scores: `[ { userId, score, levelId, timestamp } ]`
  - Levels: `[ { levelId, layoutData, createdBy, rating, ... } ]`
- This ensures easy local development.

### 4.2. Cloud Database (Future)

- **Supabase or MongoDB Atlas** recommended for scalable storage.
- Integrate user authentication and advanced queries (leaderboards, level filtering).

### 4.3. Additional Models (Roadmap)

- **User**: `{ userId, username, email, ... }`
- **Leaderboard**: Could be aggregated from the Score collection.

---

## 5. Next Steps

1. **Implement Real AI Integration**:
   - Hook the `/api/generate` endpoint to an advanced prompt for puzzle generation.
   - Possibly store user preferences to personalize puzzle themes or difficulty.
2. **Expand Score Handling**:
   - Add ranking calculations, track daily/weekly bests.
   - Return updated rank or new high score feedback.
3. **Create Basic Admin Panel** (Future):
   - Manage suspicious user content, moderate levels.
4. **Deployment to Cloud**:
   - Host this Express app on Heroku/Render.
   - Link to a cloud DB.

---

### Conclusion

This **advanced API & Backend Services** document sets the foundation for integrating robust AI features, user scoring systems, and future expansions like real-time multiplayer or monetization. By adhering to this O1-style design, you’ll maintain clarity, flexibility, and a powerful synergy with the rest of the puzzle game’s architecture.
