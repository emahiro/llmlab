import { Mastra } from "@mastra/core/mastra";
import { createLogger } from "@mastra/core/logger";

import { HogeAgent, sampleMCPAgent, weatherAgent } from "./agents";

export const mastra = new Mastra({
	agents: { weatherAgent, HogeAgent, sampleMCPAgent },
	logger: createLogger({
		name: "Mastra",
		level: "info",
	}),
});
