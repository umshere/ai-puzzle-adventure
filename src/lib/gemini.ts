import axios from "axios";

/**
 * Gemini API client for AI-powered level generation
 */
export class GeminiClient {
  private apiKey: string | null;

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || null;
  }

  /**
   * Check if the client is properly configured with API credentials
   */
  public isConfigured(): boolean {
    return !!this.apiKey;
  }

  /**
   * Generate a level using Gemini API
   */
  public async generateLevel(params: {
    playerSkill: number;
    theme: string;
    complexity?: number;
  }): Promise<any> {
    if (!this.isConfigured()) {
      throw new Error("Gemini API credentials not configured");
    }

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `You are a puzzle game level designer. Generate a JSON level layout for a puzzle game.
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
                  
                  Create a ${
                    params.theme
                  } themed puzzle level with difficulty ${
                    params.playerSkill
                  }/10.
                  The level should be challenging but solvable.
                  Complexity factor: ${params.complexity || 1.0}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
            responseMimeType: "application/json",
          },
        }
      );

      // Extract the generated content
      const generatedText = response.data.candidates[0].content.parts[0].text;

      // Parse the JSON from the text
      const jsonMatch = generatedText.match(/```json\n([\s\S]*?)\n```/) ||
        generatedText.match(/```\n([\s\S]*?)\n```/) || [null, generatedText];

      const jsonContent = jsonMatch[1].trim();

      try {
        return JSON.parse(jsonContent);
      } catch (parseError) {
        console.error("Failed to parse Gemini response as JSON:", parseError);
        throw new Error("Invalid JSON response from Gemini API");
      }
    } catch (error) {
      console.error("Gemini API call failed:", error);
      throw error;
    }
  }
}

// Export a singleton instance
export const geminiClient = new GeminiClient();
