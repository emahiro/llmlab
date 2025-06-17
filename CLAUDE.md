# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a Japanese LLM development practice repository (LLM の開発の練習用リポジトリ) containing multiple experimental applications and tools.

## Project Structure

The repository contains several independent applications:

### Root Level
- Root package.json provides common formatting/linting with Biome
- Makefile for environment setup (.env → .envrc conversion)
- Uses tab indentation (configured in biome.json)

### Sub-Applications

1. **pomodoro-timer-by-copilot-claude4/** - Next.js Pomodoro timer with SQLite
   - Commands: `npm run dev`, `npm run build`, `npm run lint`
   - Uses better-sqlite3 for session history storage
   - TailwindCSS styling, TypeScript

2. **pomodoro-timer-by-jules/** - Alternative Pomodoro implementation
   - Similar structure but different implementation approach

3. **my-fastmcp-app/** - FastMCP application
   - Command: `npm start` (runs `npx fastmcp dev src/index.ts`)
   - Uses Google GenAI integration

4. **my-mastra-app/** - Mastra framework application  
   - Command: `npm run dev` (runs `mastra dev`)
   - Uses @mastra/core and Google AI SDK

5. **claude-code-test/** - Basic JavaScript test files

## Common Commands

### Root Level
- `npm run format` - Format code with Biome
- `npm run lint` - Lint and auto-fix with Biome  
- `npm run check` - Run full Biome check
- `make setup-env` - Convert .env to .envrc for direnv
- `make clean` - Remove temporary files

### Next.js Projects (pomodoro-timer-*)
- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build for production
- `npm run lint` - ESLint checking

### MCP/Mastra Projects
- Use respective start/dev commands as defined in their package.json

## Code Style Guidelines

Based on .cursor/rules/common-rules.mdc:
- Execute exactly what is requested - no additional features
- Implement precisely specified requirements without creative extensions
- Use the simplest solution that fulfills all requirements
- Minimize lines of code while completing the task

## Formatting Configuration

- Biome is used for formatting and linting
- Tab indentation (width: 2)
- Double quotes for JavaScript
- Recommended linting rules enabled