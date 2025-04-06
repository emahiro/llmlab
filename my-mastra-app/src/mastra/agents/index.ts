import { google } from '@ai-sdk/google';
import { Agent } from '@mastra/core/agent';
import { hogeTools, weatherTool } from '../tools';
import { MastraMCPClient } from "@mastra/mcp";

export const weatherAgent = new Agent({
  name: 'お天気アシスタント',
  instructions: `
      You are a helpful weather assistant that provides accurate weather information.

      Your primary function is to help users get weather details for specific locations. When responding:
      - Always ask for a location if none is provided
      - If the location name isn’t in English, please translate it
      // 質問者の言語に合わせて回答する言語を選択すること（ex 日本語で聞かれたら日本語で答える。）
      - Always respond in the language of the question.
      - If giving a location with multiple parts (e.g. "New York, NY"), use the most relevant part (e.g. "New York")
      - Include relevant details like humidity, wind conditions, and precipitation
      - Keep responses concise but informative

      Use the weatherTool to fetch current weather data.
      - Ensure to handle errors gracefully and provide fallback responses if necessary.
`,
  model: google('gemini-1.5-pro-latest'),
  tools: { weatherTool },
});

export const HogeAgent = new Agent({
  name: 'hoge Agent',
  instructions: `
      - Always reply "hello world"`,
  model: google('gemini-1.5-pro-latest'),
  tools: { hogeTools },
});

// MCP Client Example
export const sampleMCPAgent = new Agent({
  name: "sample MCP Agent",
  instructions: `
  - You are able to fetch data from URLs on demand and discuss the response data with the user.
  - If the location name isn’t in English, please translate it
  // 質問者の言語に合わせて回答する言語を選択すること（ex 日本語で聞かれたら日本語で答える。）
  - Always respond in the language of the question.
  `,
  model: google('gemini-1.5-pro-latest'),
});

// Initialize the MCP client using mcp/fetch as an example https://hub.docker.com/r/mcp/fetch
// Visit https://github.com/docker/mcp-servers for other reference docker mcp servers
const mcpClient = new MastraMCPClient({
  name: "mcp-fetch-sample",
  server: {
    command: "podman",
    args: [
      "run",
      "-i",
      "--rm",
      "mcp/fetch:latest",
    ],
  },
});

try {
  // Connect to the MCP server
  await mcpClient.connect();
  // Gracefully handle process exits so the docker subprocess is cleaned up
  process.on("exit", () => {
    mcpClient.disconnect();
  });
  // Get available tools
  const tools = await mcpClient.tools();
  // Use the agent with the MCP tools
  const response = await sampleMCPAgent.generate(
    "Tell me about mastra.ai/docs. Tell me generally what this page is and the content it includes.",
    {
      toolsets: {
        fetch: tools,
      },
    },
  );
  console.log(`\n\n ${response.text}`);
} catch (error) {
  console.error("Error:", error);
} finally {
  // Always disconnect when done
  await mcpClient.disconnect();
}
