# Memory Manager MCP Server

A custom MCP server for managing memory caching in the AI Puzzle Adventure game. This server provides tools for storing, retrieving, and listing cached data with configurable TTL (Time To Live).

## Features

- Store values with custom keys and TTL
- Retrieve cached values by key
- List all cached keys with pattern filtering
- In-memory caching with NodeCache
- Stdio-based MCP server communication

## Tools

### 1. store_memory

Store a value in memory cache with a specific key.

```json
{
  "key": "user:123",
  "value": "cached data",
  "ttl": 3600 // optional, defaults to 1 hour
}
```

### 2. retrieve_memory

Retrieve a value from memory cache by key.

```json
{
  "key": "user:123"
}
```

### 3. list_memories

List all memory keys or filter by pattern.

```json
{
  "pattern": "user:*" // optional
}
```

## Installation

1. Install dependencies:

```bash
npm install
```

2. Build the server:

```bash
npm run build
```

3. Start the server:

```bash
npm start
```

## Adding to MCP Settings

Add to your VSCode MCP settings file:

```json
{
  "mcpServers": {
    "memory-manager": {
      "command": "node",
      "args": ["/path/to/memory-manager/build/index.js"],
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

## Development

- `npm run dev` - Run in development mode with ts-node
- `npm run build` - Build for production
- `npm start` - Run the built server
