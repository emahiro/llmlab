import { FastMCP } from 'fastmcp';
import { z } from 'zod';

const server = new FastMCP({
	name: 'my-fastmcp-server',
	version: '1.0.0',
});

server.addTool({
	name: 'hello',
	description: 'Say hello',
	parameters: z.object({
		name: z.string(),
	}),
	execute: async ({ name }) => {
		return `Hello, ${name}!`;
	},
});

server.start({
	transportType: 'stdio',
});
