# Market Dynamics

Market Dynamics is an interactive visual economics learning project focused on helping students understand how market curves and indicators respond to changing conditions. Instead of studying only static diagrams, users can explore interactive models of elasticities and externalities.

## Features

- Interactive supply and demand models for elasticities and externalities.
- Adjustable graph inputs and market indicators.
- Manual and AI-assisted externality classification.
- Light and dark themes, with a mobile-specific interface.
- Animated star-field background and cursor effect.

The automatic externality classifier uses the OpenAI API to estimate the externality type, affected side of the market, and effect value based on the submitted externality, market structure, and industry.

## Technology

- React 19, TypeScript, and Vite for the client.
- Express and TypeScript for the API server.
- OpenAI API (`gpt-5-nano`) for externality classification.

## Requirements

- Node.js and npm.
- An OpenAI API key to use automatic externality classification.

## Run Locally

The client and server are separate npm projects. Install dependencies and run each in its own terminal.

### 1. Start the API server

```bash
cd server
npm install
```

Create `server/.env` and add your OpenAI API key:

```env
OAAK=your_openai_api_key
```

Then start the server:

```bash
npm run dev
```

The API listens on `http://localhost:3000`.

### 2. Start the client

In a second terminal:

```bash
cd client
npm install
npm run dev
```

Open the URL printed by Vite (by default, `http://localhost:1234`). The Vite development server proxies `/api` requests to the local server on port `3000`.

## Other Client Commands

Run these from `client/`:

```bash
npm run build  # Type-check and create a production build
npm run lint   # Run ESLint
npm run preview # Preview the production build
```

## Project Layout

```text
client/       React application and interactive economics models
server/       Express API and OpenAI classification endpoint
deps/         Supporting dependency project files
templates/    Reusable code templates
Screenshots/  Project screenshots
```

The repository also contains `react-star-field--cursor-magnifier-effect/`, a separate React experiment for the star-field cursor effect.