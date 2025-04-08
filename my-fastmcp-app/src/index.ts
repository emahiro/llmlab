import dotenv from 'dotenv';
dotenv.config();

import { FastMCP } from "fastmcp";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";

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
		const apiKey = process.env.GEMINI_API_KEY;
		if (!apiKey) {
			throw new Error("Gemini APIキーが設定されていません");
		}
		const genAI = new GoogleGenAI({ apiKey });
		const modelName = "gemini-1.5-flash";
		const response = await genAI.models.generateContent({
			model: modelName,
			contents: [message],
		});
		const text = response.text;
		if (!text) {
			throw new Error("Gemini APIからのレスポンスが空です");
		}
		return text;
	},
});

server.start({
	transportType: "stdio",
});
