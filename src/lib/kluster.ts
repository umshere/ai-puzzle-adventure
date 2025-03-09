import { OpenAI } from "openai";

/**
 * Kluster API client for AI-powered level generation
 */
export class KlusterClient {
  private client: OpenAI;

  constructor() {
    const apiKey = process.env.KLUSTER_API_KEY;
    this.client = new OpenAI({
      apiKey: apiKey || "",
      baseURL: "https://api.kluster.ai/v1",
    });
  }

  /**
   * Check if the client is properly configured with API credentials
   */
  public isConfigured(): boolean {
    return !!process.env.KLUSTER_API_KEY;
  }

  /**
   * Generate a level using Kluster API
   */
  public async generateLevel(params: {
    playerSkill: number;
    theme: string;
    complexity?: number;
  }): Promise<any> {
    if (!this.isConfigured()) {
      console.warn("Kluster API credentials not configured, using fallback");
      return this.getFallbackLevel(params);
    }

    try {
      const response = await this.client.chat.completions.create({
        model: "klusterai/Meta-Llama-3.3-70B-Instruct-Turbo",
        max_tokens: 4000,
        temperature: 0.6,
        top_p: 1,
        messages: [
          {
            role: "system",
            content:
              "You are a puzzle game level designer. Generate levels in JSON format that are challenging but solvable.",
          },
          {
            role: "user",
            content: `Generate a JSON level layout for a puzzle game.
            The response should be a valid JSON object with the following structure:
            {
              "layout": number[][] (a 2D grid where 0 is empty space and 1 is a wall),
              "obstacles": Array<{x: number, y: number, type: string}>,
              "items": Array<{x: number, y: number, type: string}>,
              "startPosition": {x: number, y: number},
              "endPosition": {x: number, y: number}
            }
            
            The difficulty should be reflected in the complexity of the layout and number of obstacles.
            The theme should influence the types of obstacles and items.
            
            Create a ${params.theme} themed puzzle level with difficulty ${
              params.playerSkill
            }/10.
            The level should be challenging but solvable.
            Complexity factor: ${params.complexity || 1.0}`,
          },
        ],
      });

      const generatedText = response.choices[0].message.content;
      if (!generatedText) {
        throw new Error("No content in response");
      }

      // Parse the JSON from the text
      const jsonMatch = generatedText.match(/```json\n([\s\S]*?)\n```/) ||
        generatedText.match(/```\n([\s\S]*?)\n```/) || [null, generatedText];

      const jsonContent = jsonMatch[1].trim();

      try {
        return JSON.parse(jsonContent);
      } catch (parseError) {
        console.error("Failed to parse Kluster response as JSON:", parseError);
        return this.getFallbackLevel(params);
      }
    } catch (error) {
      console.error("Kluster API call failed:", error);
      return this.getFallbackLevel(params);
    }
  }

  /**
   * Generate a fallback level when the API call fails
   */
  private getFallbackLevel(params: {
    playerSkill: number;
    theme: string;
    complexity?: number;
  }) {
    console.log("Using fallback stub for level generation");

    // Generate a simple level based on player skill and theme
    const size = Math.min(5 + Math.floor(params.playerSkill / 2), 12);
    const layout = Array(size)
      .fill(0)
      .map(() => Array(size).fill(0));

    // Add some walls based on complexity
    const wallCount = Math.floor(
      (params.complexity || 1.0) * params.playerSkill
    );
    for (let i = 0; i < wallCount; i++) {
      const x = Math.floor(Math.random() * size);
      const y = Math.floor(Math.random() * size);
      if (x !== 0 && y !== 0 && x !== size - 1 && y !== size - 1) {
        layout[y][x] = 1;
      }
    }

    return {
      layout,
      obstacles: [
        {
          x: Math.floor(size / 2),
          y: Math.floor(size / 2),
          type: params.theme === "space" ? "asteroid" : "block",
        },
      ],
      items: [
        {
          x: 1,
          y: 1,
          type: params.theme === "space" ? "fuel" : "gem",
        },
      ],
      startPosition: { x: 0, y: 0 },
      endPosition: { x: size - 1, y: size - 1 },
    };
  }
}

// Export a singleton instance
export const klusterClient = new KlusterClient();
