import { FastMCP } from "fastmcp";
import { z } from "zod";

const server = new FastMCP({
	name: "my-fastmcp-server",
	version: "1.0.0",
});

server.addTool({
	name: "hello",
	description: "Say hello",
	parameters: z.object({
		name: z.string(),
	}),
	execute: async ({ name }) => {
		return `Hello, ${name}!`;
	},
});

server.addTool({
	name: "gemini-agent",
	description: "Gemini agent",
	parameters: z.object({
		message: z.string(),
	}),
	execute: async ({ message }) => {
		// some code
		return "Hello, world!";
	},
});

server.start({
	transportType: "stdio",
});
