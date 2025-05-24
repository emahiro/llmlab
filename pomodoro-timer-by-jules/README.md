# Pomodoro Timer by Jules

**This is an experimental application created by Jules (an AI assistant).**

## About

This is a simple Pomodoro timer application built with Next.js and Tailwind CSS. It allows users to manage work and break intervals using the Pomodoro Technique. Session history is stored locally using SQLite.

## Features

*   **Pomodoro Timer**:
    *   Standard 25-minute work sessions and 5-minute break sessions.
    *   Timer display (MM:SS).
    *   Start, Stop, and Reset controls.
    *   Automatic switching between work and break sessions.
    *   Notification (textual) of current session type (Work/Break).
*   **Session History**:
    *   Completed Pomodoro sessions (both work and break) are saved locally.
    *   History is displayed in a sidebar, showing:
        *   Session type (Work/Break)
        *   Start time
        *   Duration
    *   The history sidebar automatically updates when a new session is completed.
*   **Tech Stack**:
    *   Next.js (App Router, TypeScript)
    *   React
    *   Tailwind CSS
    *   SQLite (for local data storage)

## Setup & Running

To set up and run this project locally:

1.  **Clone the repository** (if you haven't already).
2.  **Navigate to the project directory**:
    ```bash
    cd pomodoro-timer-by-jules
    ```
3.  **Install dependencies**:
    Make sure you have Node.js and npm installed.
    ```bash
    npm install
    ```
4.  **Run the development server**:
    ```bash
    npm run dev
    ```
    This will typically start the application on `http://localhost:3000`.

The SQLite database file (`pomodoro.db`) will be created in the `pomodoro-timer-by-jules` project root directory when the application first attempts to access or write to the database (e.g., when the first session is saved or when the history page is loaded).
