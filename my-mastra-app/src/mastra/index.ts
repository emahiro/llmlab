
import { Mastra } from '@mastra/core/mastra';
import { createLogger } from '@mastra/core/logger';

import { HogeAgent, weatherAgent } from './agents';

export const mastra = new Mastra({
  agents: { weatherAgent, HogeAgent },
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
