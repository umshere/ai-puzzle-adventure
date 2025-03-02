#!/usr/bin/env node
import NodeCache from "node-cache";

// Memory cache with 1 hour standard TTL
const memoryCache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });

// Interface for server capabilities
interface ServerCapabilities {
  tools: Record<string, unknown>;
}

// Interface for server metadata
interface ServerMetadata {
  name: string;
  version: string;
}

// Interface for tool schemas
interface ToolSchema {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties: Record<string, unknown>;
    required?: string[];
  };
}

// Basic MCP server implementation
class MemoryManagerServer {
  private tools: ToolSchema[];

  constructor() {
    this.tools = [
      {
        name: "store_memory",
        description: "Store a value in memory cache with a specific key",
        inputSchema: {
          type: "object",
          properties: {
            key: {
              type: "string",
              description: "Unique identifier for the memory",
            },
            value: {
              type: "string",
              description: "Content to store in memory",
            },
            ttl: {
              type: "number",
              description: "Time to live in seconds (optional, default: 3600)",
            },
          },
          required: ["key", "value"],
        },
      },
      {
        name: "retrieve_memory",
        description: "Retrieve a value from memory cache by key",
        inputSchema: {
          type: "object",
          properties: {
            key: {
              type: "string",
              description: "Unique identifier for the memory to retrieve",
            },
          },
          required: ["key"],
        },
      },
      {
        name: "list_memories",
        description: "List all memory keys or filter by pattern",
        inputSchema: {
          type: "object",
          properties: {
            pattern: {
              type: "string",
              description: 'Optional pattern to filter keys (e.g., "user:*")',
            },
          },
        },
      },
    ];
  }

  // Handle incoming messages
  private handleMessage(message: string): string {
    try {
      const request = JSON.parse(message);

      switch (request.method) {
        case "list_tools":
          return JSON.stringify({
            id: request.id,
            result: { tools: this.tools },
          });

        case "call_tool":
          return JSON.stringify({
            id: request.id,
            result: this.handleToolCall(request.params),
          });

        default:
          return JSON.stringify({
            id: request.id,
            error: {
              code: -32601,
              message: "Method not found",
            },
          });
      }
    } catch (error) {
      return JSON.stringify({
        id: null,
        error: {
          code: -32700,
          message: "Parse error",
        },
      });
    }
  }

  // Handle tool calls
  private handleToolCall(params: any): {
    content: { type: string; text: string }[];
  } {
    const { name, arguments: args } = params;

    switch (name) {
      case "store_memory":
        return this.handleStoreMemory(args);
      case "retrieve_memory":
        return this.handleRetrieveMemory(args);
      case "list_memories":
        return this.handleListMemories(args);
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  }

  private handleStoreMemory(args: any): {
    content: { type: string; text: string }[];
  } {
    const { key, value, ttl } = args;
    const success = memoryCache.set(key, value, ttl);

    return {
      content: [
        {
          type: "text",
          text: success
            ? `Successfully stored memory with key: ${key}`
            : `Failed to store memory with key: ${key}`,
        },
      ],
    };
  }

  private handleRetrieveMemory(args: any): {
    content: { type: string; text: string }[];
  } {
    const { key } = args;
    const value = memoryCache.get<string>(key);

    if (value === undefined) {
      return {
        content: [
          {
            type: "text",
            text: `No memory found with key: ${key}`,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: value,
        },
      ],
    };
  }

  private handleListMemories(args: any): {
    content: { type: string; text: string }[];
  } {
    const { pattern } = args || {};
    const keys = memoryCache.keys();

    let filteredKeys = keys;
    if (pattern) {
      const regex = new RegExp(pattern.replace(/\*/g, ".*"));
      filteredKeys = keys.filter((key) => regex.test(key));
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(filteredKeys, null, 2),
        },
      ],
    };
  }

  // Start the server
  public run(): void {
    process.stdin.setEncoding("utf-8");
    process.stdin.on("data", (chunk: string) => {
      const response = this.handleMessage(chunk);
      process.stdout.write(response + "\n");
    });

    // Error handling
    process.on("SIGINT", () => {
      process.exit(0);
    });

    console.error("Memory Manager MCP server running on stdio");
  }
}

// Start server
const server = new MemoryManagerServer();
server.run();
