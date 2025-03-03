# AI-Assisted Creative Puzzle Adventure – API & Backend Services (Advanced O1 Update)

## 1. Overview & Purpose

The backend is built with **Next.js API Routes**, serving as the central hub for procedural level generation, score submissions, and AI integration via **OpenRouter**. This document provides an **advanced O1-style** blueprint, merging robust AI synergy with a clear expansion path.

---

## 2. API Endpoints

### 2.1. Health Check

**Endpoint:** `GET /api/health`

- **Response:** `{ "status": "ok", "version": "1.0.0", "uptime": "10h 30m" }`
- **Purpose:** Quick readiness test. Use for monitoring/DevOps checks.
- **Implementation:**
  ```javascript
  // pages/api/health.js
  export default function handler(req, res) {
    const startTime = process.env.SERVER_START_TIME || new Date().getTime();
    const uptime = Math.floor((new Date().getTime() - startTime) / 1000 / 60);
    
    res.status(200).json({
      status: "ok",
      version: process.env.APP_VERSION || "1.0.0",
      uptime: `${Math.floor(uptime/60)}h ${uptime%60}m`
    });
  }
  ```

### 2.2. Generate AI-Powered Level

**Endpoint:** `POST /api/generate`

- **Request Example:**
  ```json
  {
    "playerSkill": 3,
    "theme": "sci-fi",
    "previousCompletionTime": 45, // Optional
    "preferredComplexity": "medium" // Optional
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
    "collectibles": [{ "x": 0, "y": 0, "type": "coin" }],
    "difficultyRating": 4,
    "estimatedCompletionTime": 50,
    "themeElements": ["spaceship", "asteroid"]
  }
  ```
- **Logic Flow:**
  1. Check for OpenRouter tokens (from `.env`). If valid, call external AI to generate puzzle data.
  2. If tokens missing or AI call fails, use local `generateLevel()` stub.
  3. Return JSON layout describing puzzle structure.
- **Rate Limiting:**
  - Implement a token bucket algorithm with 60 requests per hour per user.
  - Return status 429 when limit exceeded.
- **Implementation:**
  ```javascript
  // pages/api/generate.js
  import { rateLimit } from 'lib/rateLimit';
  import { generateLevelWithAI, generateLevelStub } from 'lib/levelGeneration';
  
  const limiter = rateLimit({
    interval: 60 * 60 * 1000, // 1 hour
    uniqueTokenPerInterval: 500, // Max users per hour
    tokensPerInterval: 60 // Requests per user
  });
  
  export default async function handler(req, res) {
    // Check request method
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
      // Apply rate limiting
      await limiter.check(res, 60, req.headers['x-forwarded-for'] || 'anonymous');
      
      const { playerSkill, theme, previousCompletionTime, preferredComplexity } = req.body;
      
      // Validate inputs
      if (playerSkill === undefined || !theme) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }
      
      // Generate level (with AI or fallback)
      let levelData;
      try {
        levelData = await generateLevelWithAI(playerSkill, theme, {
          previousCompletionTime,
          preferredComplexity
        });
      } catch (aiError) {
        console.warn('AI level generation failed, using fallback:', aiError);
        levelData = generateLevelStub(playerSkill, theme);
      }
      
      // Return the generated level
      return res.status(200).json(levelData);
    } catch (error) {
      // Handle rate limit exceeded
      if (error.statusCode === 429) {
        return res.status(429).json({ error: 'Too many requests' });
      }
      
      console.error('Error generating level:', error);
      return res.status(500).json({ error: 'Failed to generate level' });
    }
  }
  ```

### 2.3. Submit Score

**Endpoint:** `POST /api/score`

- **Request Example:**
  ```json
  {
    "userId": "player123",
    "score": 6200,
    "levelId": "abc123",
    "completionTime": 47,
    "collectiblesGathered": 5,
    "deathCount": 2
  }
  ```
- **Response Example:**
  ```json
  {
    "message": "Score saved successfully",
    "leaderboardPosition": 5,
    "personalBest": true,
    "achievements": ["speed_demon", "collector"]
  }
  ```
- **Logic Flow:**
  1. Parse user/score data.
  2. Verify that the submission is legitimate (simple anti-cheat).
  3. Persist data in database using Prisma ORM.
  4. Calculate new leaderboard position.
  5. Check for achievement unlocks.
- **Security Measures:**
  - Implement JWT validation to ensure authentic user submissions.
  - Add basic anti-cheat detection (impossible scores, completion times).
- **Implementation:**
  ```javascript
  // pages/api/score.js
  import { prisma } from 'lib/prismaClient';
  import { validateScore, checkAchievements } from 'lib/gameLogic';
  import { verifyToken } from 'lib/auth';
  
  export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
      // Verify user authentication (if implemented)
      const authHeader = req.headers.authorization;
      let userId = req.body.userId;
      
      if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        const tokenData = verifyToken(token);
        
        // Override userId with verified token data
        if (tokenData) userId = tokenData.userId;
      }
      
      const { score, levelId, completionTime, collectiblesGathered, deathCount } = req.body;
      
      // Basic validation
      if (!userId || score === undefined || !levelId) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }
      
      // Anti-cheat validation
      const isValidScore = await validateScore({
        userId, score, levelId, completionTime, collectiblesGathered, deathCount
      });
      
      if (!isValidScore) {
        console.warn(`Suspicious score submission: ${userId}, Score: ${score}, Level: ${levelId}`);
        return res.status(400).json({ error: 'Invalid score submission' });
      }
      
      // Save score to database
      const savedScore = await prisma.score.create({
        data: {
          userId,
          levelId,
          points: score,
          completionTime: completionTime || null,
          collectiblesGathered: collectiblesGathered || 0,
          deathCount: deathCount || 0
        }
      });
      
      // Calculate leaderboard position
      const leaderboardPosition = await prisma.score.count({
        where: {
          levelId,
          points: { gt: score }
        }
      }) + 1;
      
      // Check if this is a personal best
      const personalBest = await prisma.score.count({
        where: {
          userId,
          levelId,
          points: { gt: score }
        }
      }) === 0;
      
      // Check achievements
      const achievements = await checkAchievements(userId, levelId, {
        score, completionTime, collectiblesGathered, deathCount
      });
      
      return res.status(200).json({
        message: 'Score saved successfully',
        leaderboardPosition,
        personalBest,
        achievements
      });
    } catch (error) {
      console.error('Error saving score:', error);
      return res.status(500).json({ error: 'Failed to save score' });
    }
  }
  ```

### 2.4. Get Leaderboard

**Endpoint:** `GET /api/leaderboard/:levelId`

- **Query Parameters:**
  - `limit`: Number of entries to return (default: 10)
  - `offset`: Pagination offset (default: 0)
  - `friendsOnly`: Boolean, filter to only show friends (default: false)
- **Response Example:**
  ```json
  {
    "leaderboard": [
      { "userId": "alice", "username": "AliceGamer", "score": 9800, "completionTime": 32 },
      { "userId": "bob", "username": "BobTheBuilder", "score": 8500, "completionTime": 45 }
    ],
    "userRank": 15,
    "totalEntries": 243
  }
  ```
- **Implementation:**
  ```javascript
  // pages/api/leaderboard/[levelId].js
  import { prisma } from 'lib/prismaClient';
  
  export default async function handler(req, res) {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
      const { levelId } = req.query;
      const limit = parseInt(req.query.limit) || 10;
      const offset = parseInt(req.query.offset) || 0;
      const friendsOnly = req.query.friendsOnly === 'true';
      
      let whereClause = { levelId };
      
      // If friends-only filter is enabled and user is authenticated
      if (friendsOnly && req.headers.authorization) {
        const userId = getUserIdFromAuth(req.headers.authorization);
        
        if (userId) {
          // Get user's friends list
          const friends = await prisma.friendship.findMany({
            where: { OR: [{ user1Id: userId }, { user2Id: userId }] },
            select: { 
              user1Id: true, 
              user2Id: true 
            }
          });
          
          // Create array of friend IDs
          const friendIds = friends.map(f => 
            f.user1Id === userId ? f.user2Id : f.user1Id
          );
          
          // Add friends filter to where clause
          whereClause.userId = { in: [...friendIds, userId] };
        }
      }
      
      // Get leaderboard entries
      const leaderboard = await prisma.score.findMany({
        where: whereClause,
        orderBy: { points: 'desc' },
        take: limit,
        skip: offset,
        include: {
          user: {
            select: { username: true, avatarUrl: true }
          }
        }
      });
      
      // Transform to client-friendly format
      const formattedLeaderboard = leaderboard.map(entry => ({
        userId: entry.userId,
        username: entry.user.username,
        avatarUrl: entry.user.avatarUrl,
        score: entry.points,
        completionTime: entry.completionTime
      }));
      
      // Get total count for pagination
      const totalEntries = await prisma.score.count({ where: whereClause });
      
      // Get user's rank if authenticated
      let userRank = null;
      if (req.headers.authorization) {
        const userId = getUserIdFromAuth(req.headers.authorization);
        if (userId) {
          const userScore = await prisma.score.findFirst({
            where: { levelId, userId },
            orderBy: { points: 'desc' }
          });
          
          if (userScore) {
            userRank = await prisma.score.count({
              where: {
                levelId,
                points: { gt: userScore.points }
              }
            }) + 1;
          }
        }
      }
      
      return res.status(200).json({
        leaderboard: formattedLeaderboard,
        userRank,
        totalEntries
      });
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
  }
  ```

### 2.5. User-Created Levels

**Endpoint:** `GET /api/user-levels/:userId`

- **Response Example:**
  ```json
  {
    "levels": [
      {
        "levelId": "xyz678",
        "title": "Space Maze",
        "difficultyRating": 4.2,
        "totalPlays": 128,
        "createdAt": "2025-01-12T10:00:00Z",
        "previewImage": "https://example.com/preview/xyz678.jpg"
      }
    ],
    "totalLevels": 5,
    "featuredLevel": "abc123"
  }
  ```
- **Implementation:**
  ```javascript
  // pages/api/user-levels/[userId].js
  import { prisma } from 'lib/prismaClient';
  
  export default async function handler(req, res) {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
      const { userId } = req.query;
      const limit = parseInt(req.query.limit) || 10;
      const offset = parseInt(req.query.offset) || 0;
      
      // Get user's levels
      const levels = await prisma.level.findMany({
        where: { 
          createdBy: userId,
          isPublished: true 
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
        select: {
          id: true,
          title: true,
          difficultyRating: true,
          createdAt: true,
          previewImageUrl: true,
          _count: {
            select: { plays: true }
          }
        }
      });
      
      // Transform to client-friendly format
      const formattedLevels = levels.map(level => ({
        levelId: level.id,
        title: level.title,
        difficultyRating: level.difficultyRating,
        totalPlays: level._count.plays,
        createdAt: level.createdAt,
        previewImage: level.previewImageUrl
      }));
      
      // Get total count for pagination
      const totalLevels = await prisma.level.count({ 
        where: { 
          createdBy: userId,
          isPublished: true 
        }
      });
      
      // Get featured level (most played or highest rated)
      const featuredLevel = await prisma.level.findFirst({
        where: { 
          createdBy: userId,
          isPublished: true 
        },
        orderBy: { 
          plays: { _count: 'desc' } 
        },
        select: { id: true }
      });
      
      return res.status(200).json({
        levels: formattedLevels,
        totalLevels,
        featuredLevel: featuredLevel?.id || null
      });
    } catch (error) {
      console.error('Error fetching user levels:', error);
      return res.status(500).json({ error: 'Failed to fetch user levels' });
    }
  }
  ```

---

## 3. OpenRouter API Integration

### 3.1. Environment Variables

- **.env file:**
  ```bash
  OPENROUTER_API_KEY=your_key_here
  OPENROUTER_API_TOKEN=your_token_here
  OPENROUTER_MODEL=anthropic/claude-3-opus-20240229
  LEVEL_GENERATION_SYSTEM_PROMPT="You are an expert puzzle game level designer..."
  ```

### 3.2. AI Integration Module

```javascript
// lib/aiIntegration.js
import axios from 'axios';

/**
 * Call OpenRouter API to generate level content
 * @param {Object} promptData - Data to send to the AI
 * @returns {Promise<Object>} - AI-generated level data
 */
export async function callOpenRouter(promptData) {
  // Check if tokens are available
  if (!process.env.OPENROUTER_API_KEY || !process.env.OPENROUTER_API_TOKEN) {
    console.log("OpenRouter tokens missing, using fallback AI stub.");
    throw new Error('OpenRouter tokens missing');
  }

  try {
    // Prepare headers
    const config = {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_TOKEN}`,
        'X-API-Key': process.env.OPENROUTER_API_KEY,
        'Content-Type': 'application/json'
      },
    };
    
    // Prepare message structure
    const messages = [
      {
        role: 'system',
        content: process.env.LEVEL_GENERATION_SYSTEM_PROMPT || 
                 'You are an expert puzzle game level designer. Create engaging and balanced levels.'
      },
      {
        role: 'user',
        content: `Generate a puzzle level with the following parameters:
                  Player Skill Level: ${promptData.playerSkill}/10
                  Theme: ${promptData.theme}
                  ${promptData.previousCompletionTime ? 
                    `Previous Level Completion Time: ${promptData.previousCompletionTime} seconds` : ''}
                  ${promptData.preferredComplexity ? 
                    `Preferred Complexity: ${promptData.preferredComplexity}` : ''}
                  
                  Return the level layout as a JSON object with these fields:
                  - layout: 2D grid array (0 = empty, 1 = wall, 2 = interactive element)
                  - obstacles: Array of obstacle objects with position and type
                  - collectibles: Array of collectible objects with position and type
                  - difficultyRating: Numeric rating from 1-10
                  - estimatedCompletionTime: Time in seconds
                  - themeElements: Array of thematic elements to include`
      }
    ];
    
    // Call OpenRouter API
    const response = await axios.post(
      'https://api.openrouter.ai/api/v1/chat/completions',
      {
        model: process.env.OPENROUTER_MODEL || 'anthropic/claude-3-opus-20240229',
        messages: messages,
        response_format: { type: "json_object" }
      },
      config
    );
    
    // Extract and parse the level data from response
    const content = response.data.choices[0].message.content;
    let levelData;
    
    try {
      levelData = JSON.parse(content);
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      
      // Attempt to extract JSON if wrapped in markdown code blocks
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch && jsonMatch[1]) {
        levelData = JSON.parse(jsonMatch[1]);
      } else {
        throw new Error('Could not parse AI response');
      }
    }
    
    // Generate a unique ID for the level
    const levelId = generateUniqueId();
    return { levelId, ...levelData };
  } catch (err) {
    console.error("OpenRouter call failed:", err);
    throw err;
  }
}

/**
 * Generate a unique ID for levels
 * @returns {string} Unique ID
 */
function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}
```

### 3.3. Level Generation Service

```javascript
// lib/levelGeneration.js
import { callOpenRouter } from './aiIntegration';
import { getLevelCache, setLevelCache } from './caching';

/**
 * Generate a level using AI
 * @param {number} playerSkill - Player skill rating (1-10)
 * @param {string} theme - Level theme
 * @param {Object} options - Additional options
 * @returns {Promise<Object>} Generated level data
 */
export async function generateLevelWithAI(playerSkill, theme, options = {}) {
  // Check cache first (for performance and cost optimization)
  const cacheKey = `level:${playerSkill}:${theme}:${JSON.stringify(options)}`;
  const cachedLevel = await getLevelCache(cacheKey);
  
  if (cachedLevel) {
    // Modify slightly to avoid exact duplication
    cachedLevel.levelId = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    return cachedLevel;
  }
  
  try {
    // Call AI to generate level
    const promptData = {
      playerSkill,
      theme,
      ...options
    };
    
    const levelData = await callOpenRouter(promptData);
    
    // Validate level structure
    validateLevelData(levelData);
    
    // Cache the result for future requests
    await setLevelCache(cacheKey, levelData, 3600); // Cache for 1 hour
    
    return levelData;
  } catch (error) {
    console.error('AI level generation failed:', error);
    // Fall back to local generation
    return generateLevelStub(playerSkill, theme);
  }
}

/**
 * Validate level data structure
 * @param {Object} levelData - Level data to validate
 * @throws {Error} If validation fails
 */
function validateLevelData(levelData) {
  // Check for required fields
  if (!levelData.layout || !Array.isArray(levelData.layout)) {
    throw new Error('Invalid level data: missing or invalid layout');
  }
  
  // Validate layout is a 2D array
  if (!levelData.layout.every(row => Array.isArray(row))) {
    throw new Error('Invalid level data: layout must be a 2D array');
  }
  
  // Additional validations...
  
  return true;
}

/**
 * Generate a level locally (fallback if AI fails)
 * @param {number} playerSkill - Player skill rating (1-10)
 * @param {string} theme - Level theme
 * @returns {Object} Generated level data
 */
export function generateLevelStub(playerSkill, theme) {
  // Convert player skill to grid size (higher skill = larger grid)
  const size = Math.min(4 + Math.floor(playerSkill / 2), 10);
  
  // Generate a random grid layout
  const layout = Array(size).fill().map(() => 
    Array(size).fill().map(() => Math.random() > 0.7 ? 1 : 0)
  );
  
  // Ensure start and end points are clear
  layout[0][0] = 0; // Start
  layout[size-1][size-1] = 0; // End
  
  // Generate obstacles based on theme
  const obstacles = [];
  const numObstacles = Math.floor(playerSkill * 1.5);
  
  for (let i = 0; i < numObstacles; i++) {
    let x, y;
    do {
      x = Math.floor(Math.random() * size);
      y = Math.floor(Math.random() * size);
    } while (layout[y][x] !== 0 || (x === 0 && y === 0) || (x === size-1 && y === size-1));
    
    const obstacleTypes = {
      'sci-fi': ['laser', 'drone', 'forcefield'],
      'fantasy': ['trap', 'potion', 'monster'],
      'urban': ['barrier', 'camera', 'guard'],
      // Default theme if none provided
      'default': ['spike', 'pit', 'moving_block']
    };
    
    const themeTypes = obstacleTypes[theme] || obstacleTypes.default;
    const type = themeTypes[Math.floor(Math.random() * themeTypes.length)];
    
    obstacles.push({ x, y, type });
  }
  
  // Generate collectibles
  const collectibles = [];
  const numCollectibles = Math.floor(playerSkill * 0.8);
  
  for (let i = 0; i < numCollectibles; i++) {
    let x, y;
    do {
      x = Math.floor(Math.random() * size);
      y = Math.floor(Math.random() * size);
    } while (
      layout[y][x] !== 0 || 
      (x === 0 && y === 0) || 
      (x === size-1 && y === size-1) ||
      obstacles.some(obs => obs.x === x && obs.y === y)
    );
    
    const collectibleTypes = {
      'sci-fi': ['data_chip', 'energy_cell', 'blueprint'],
      'fantasy': ['gem', 'scroll', 'key'],
      'urban': ['coin', 'document', 'keycard'],
      'default': ['coin', 'star', 'power_up']
    };
    
    const themeTypes = collectibleTypes[theme] || collectibleTypes.default;
    const type = themeTypes[Math.floor(Math.random() * themeTypes.length)];
    
    collectibles.push({ x, y, type });
  }
  
  // Generate thematic elements
  const themeElements = {
    'sci-fi': ['spaceship', 'robot', 'computer', 'laser', 'alien'],
    'fantasy': ['castle', 'dragon', 'wizard', 'treasure', 'forest'],
    'urban': ['skyscraper', 'car', 'street', 'park', 'store'],
    'default': ['tree', 'rock', 'water', 'building', 'mountain']
  };
  
  const elements = themeElements[theme] || themeElements.default;
  const selectedElements = [];
  
  for (let i = 0; i < 3; i++) {
    const element = elements[Math.floor(Math.random() * elements.length)];
    if (!selectedElements.includes(element)) {
      selectedElements.push(element);
    }
  }
  
  return {
    levelId: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
    layout,
    obstacles,
    collectibles,
    difficultyRating: playerSkill,
    estimatedCompletionTime: 30 + (playerSkill * 5),
    themeElements: selectedElements
  };
}
```

### 3.4. Caching Service for AI Responses

```javascript
// lib/caching.js
import { prisma } from './prismaClient';

/**
 * Get cached level data
 * @param {string} key - Cache key
 * @returns {Promise<Object|null>} Cached level data or null
 */
export async function getLevelCache(key) {
  // Check if in memory cache first (for performance)
  if (global.levelCache?.[key]) {
    const { data, expiresAt } = global.levelCache[key];
    
    // Return if not expired
    if (expiresAt > Date.now()) {
      return data;
    }
    
    // Remove from memory if expired
    delete global.levelCache[key];
  }
  
  try {
    // Check database cache
    const cacheEntry = await prisma.cache.findUnique({
      where: { key }
    });
    
    if (cacheEntry && cacheEntry.expiresAt > new Date()) {
      const data = JSON.parse(cacheEntry.data);
      
      // Update memory cache
      if (!global.levelCache) global.levelCache = {};
      global.levelCache[key] = {
        data,
        expiresAt: cacheEntry.expiresAt.getTime()
      };
      
      return data;
    }
    
    // Clean up expired entry
    if (cacheEntry) {
      await prisma.cache.delete({
        where: { key }
      });
    }
    
    return null;
  } catch (error) {
    console.error('Cache retrieval error:', error);
    return null;
  }
}

/**
 * Set level data in cache
 * @param {string} key - Cache key
 * @param {Object} data - Data to cache
 * @param {number} ttlSeconds - Time to live in seconds
 */
export async function setLevelCache(key, data, ttlSeconds = 3600) {
  try {
    // Set memory cache
    if (!global.levelCache) global.levelCache = {};
    global.levelCache[key] = {
      data,
      expiresAt: Date.now() + (ttlSeconds * 1000)
    };
    
    // Set database cache
    const expiresAt = new Date(Date.now() + (ttlSeconds * 1000));
    
    await prisma.cache.upsert({
      where: { key },
      update: {
        data: JSON.stringify(data),
        expiresAt
      },
      create: {
        key,
        data: JSON.stringify(data),
        expiresAt
      }
    });
  } catch (error) {
    console.error('Cache setting error:', error);
  }
}

/**
 * Clear expired cache entries
 * Should be run periodically (e.g., daily cron job)
 */
export async function clearExpiredCache() {
  try {
    const deleted = await prisma.cache.deleteMany({
      where: {
        expiresAt: { lt: new Date() }
      }
    });
    
    console.log(`Cleared ${deleted.count} expired cache entries`);
    
    // Also clear memory cache
    if (global.levelCache) {
      const now = Date.now();
      Object.keys(global.levelCache).forEach(key => {
        if (global.levelCache[key].expiresAt < now) {
          delete global.levelCache[key];
        }
      });
    }
  } catch (error) {
    console.error('Error clearing expired cache:', error);
  }
}
```

---

## 4. Data & Storage

### 4.1. Prisma Schema (Database Models)

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// User model
model User {
  id            String    @id @default(cuid())
  username      String    @unique
  email         String?   @unique
  avatarUrl     String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // Relationships
  scores        Score[]
  levels        Level[]   @relation("CreatedLevels")
