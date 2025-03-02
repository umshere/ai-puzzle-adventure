import axios from "axios";

/**
 * OpenRouter API client for AI-powered level generation
 */
export class OpenRouterClient {
  private apiKey: string | null;
  private apiToken: string | null;

  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY || null;
    this.apiToken = process.env.OPENROUTER_API_TOKEN || null;
  }

  /**
   * Check if the client is properly configured with API credentials
   */
  public isConfigured(): boolean {
    return !!(this.apiKey && this.apiToken);
  }

  /**
   * Generate a level using OpenRouter API
   */
  public async generateLevel(params: {
    playerSkill: number;
    theme: string;
    complexity?: number;
  }): Promise<any> {
    if (!this.isConfigured()) {
      throw new Error("OpenRouter API credentials not configured");
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
          "X-API-Key": this.apiKey,
        },
      };

      const response = await axios.post(
        "https://api.openrouter.ai/api/v1/chat/completions",
        {
          model: "anthropic/claude-3-opus:beta",
          messages: [
            {
              role: "system",
              content: `You are a puzzle game level designer. Generate a JSON level layout for a puzzle game.
              The response should be a valid JSON object with the following structure:
              {
                "layout": number[][] (a 2D grid where 0 is empty space and 1 is a wall),
                "obstacles": Array<{x: number, y: number, type: string}>,
                "items": Array<{x: number, y: number, type: string}>,
                "startPosition": {x: number, y: number},
                "endPosition": {x: number, y: number}
              }
              
              The difficulty should be reflected in the complexity of the layout and number of obstacles.
              The theme should influence the types of obstacles and items.`,
            },
            {
              role: "user",
              content: `Create a ${
                params.theme
              } themed puzzle level with difficulty ${params.playerSkill}/10.
              The level should be challenging but solvable.
              Complexity factor: ${params.complexity || 1.0}`,
            },
          ],
          response_format: { type: "json_object" },
        },
        config
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error("OpenRouter API call failed:", error);
      throw error;
    }
  }
}

// Export a singleton instance
export const openRouterClient = new OpenRouterClient();
