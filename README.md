# AI-Powered Research & Recommendation Agent

Production-grade MERN + Google Gemini application that generates structured business intelligence reports for any company.

MERN Stack | Google Gemini 2.5 Flash | Google Search Grounding | MongoDB | REST APIs

## 1. Project Overview

### Introduction

The AI-Powered Research & Recommendation Agent is an enterprise-style web application that accepts a company name as input and generates a structured business intelligence report using Google Gemini with Google Search grounding.

Instead of returning a generic AI answer, the application asks Gemini to produce company-focused analysis, practical AI opportunities, and an executive-ready CEO pitch.

### Business Problem

Business development teams, consultants, and sales teams often spend significant time researching companies before approaching decision makers.

This application automates that research process by generating:

- Company overview
- Business information
- Business challenges
- AI opportunities
- CEO pitch
- Sources
- Search history

## 2. Objective

The objective of this project is to build an intelligent AI system that can research any company and produce a structured report with practical AI recommendations.

Goals:

- Reduce manual company research time
- Improve business analysis quality
- Demonstrate AI reasoning with structured output
- Generate executive-ready insights
- Store reports and search history in MongoDB

## 3. Features

### Business Features

- Company intelligence report
- Business overview
- Major offerings and public information
- Company-specific business challenges
- AI recommendations by department or function
- CEO pitch letter
- Research sources
- Recent search history

### Technical Features

- MERN stack architecture
- Google Gemini 2.5 Flash integration
- Google Search grounding
- MongoDB and Mongoose models
- Express REST APIs
- Request validation using `express-validator`
- Layered backend structure
- Secure `.env` handling with `.gitignore`

## 4. Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, Vite, Axios, Tailwind CSS, React Icons |
| Backend | Node.js, Express.js, MongoDB, Mongoose |
| AI | Google Gemini 2.5 Flash, Google Search Tool, Prompt Engineering |
| Validation | express-validator |
| Environment | dotenv |

## 5. Project Architecture

High-level data flow:

```txt
React Frontend
  |
  v
Express Routes
  |
  v
Controller
  |
  v
Services
  |
  v
Google Gemini + Google Search Grounding
  |
  v
MongoDB
  |
  v
React Report UI
```

## 6. System Workflow

1. User enters a company name in the frontend.
2. Frontend sends `POST /api/research` to the backend.
3. Backend validates the `companyName`.
4. Controller calls the AI service.
5. AI service builds the prompt using `prompts/masterPrompt.js`.
6. Gemini researches the company using Google Search grounding.
7. Gemini returns structured JSON.
8. Backend saves the report in MongoDB.
9. Backend stores search status and response time in search history.
10. Frontend displays the generated report.
11. Frontend loads recent searches from `GET /api/history`.

## 7. Folder Structure

```txt
backend/AI-APP/
  config/
    db.js
  controller/
    research.controller.js
  model/
    report.js
    SearchHistory.js
  prompts/
    masterPrompt.js
  routes/
    reportrouter.js
  Services/
    ai.service.js
    report.service.js
  validators/
    report.validator.js
  .env.example
  .gitignore
  package.json
  server.js

frontend/
  src/
    app/
      App.tsx
    components/
    pages/
      Home.tsx
    services/
      api.ts
    styles/
    main.tsx
```

## 8. Backend Architecture

| Module | Files | Purpose |
| --- | --- | --- |
| Config | `config/db.js` | Connects backend to MongoDB |
| Controller | `controller/research.controller.js` | Handles research generation and history operations |
| Services | `Services/ai.service.js`, `Services/report.service.js` | Handles AI generation and report persistence |
| Models | `model/report.js`, `model/SearchHistory.js` | Defines MongoDB schemas |
| Routes | `routes/reportrouter.js` | Defines active REST endpoints |
| Validators | `validators/report.validator.js` | Validates company name and MongoDB ids |
| Prompts | `prompts/masterPrompt.js` | Defines Gemini output structure |

## 9. Database Design

### Collections

`reports` stores generated AI research reports.

`searchhistories` stores recent searches, success/failure status, and response time.

### Report Schema

- `companyName`
- `overview`
  - `summary`
  - `industry`
  - `scale`
  - `geographicPresence`
- `businessInformation`
  - `majorOfferings`
  - `recentDevelopments`
  - `expansionPlans`
  - `importantPublicInformation`
- `businessChallenges[]`
  - `title`
  - `description`
  - `reasoning`
- `aiOpportunities[]`
  - `department`
  - `problem`
  - `solution`
  - `expectedImpact`
- `ceoPitch`
  - `subject`
  - `introduction`
  - `opportunities`
  - `recommendations`
  - `conclusion`
- `sources[]`
  - `title`
  - `url`
- `createdAt`
- `updatedAt`

### SearchHistory Schema

- `companyName`
- `status` (`Success` or `Failed`)
- `responseTime`
- `createdAt`
- `updatedAt`

## 10. API Endpoints

Base URL:

```txt
http://localhost:5000/api
```

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/research` | Generate and save a company report |
| GET | `/history` | Fetch recent search history |
| DELETE | `/history/:id` | Delete a search history item |

Health check:

```txt
GET http://localhost:5000/
```

### POST `/api/research`

Request:

```json
{
  "companyName": "Tesla"
}
```

Response:

```json
{
  "success": true,
  "message": "Research generated successfully.",
  "report": {}
}
```

### GET `/api/history`

Response:

```json
{
  "success": true,
  "data": []
}
```

### DELETE `/api/history/:id`

Response:

```json
{
  "success": true,
  "message": "History item deleted successfully.",
  "data": {}
}
```

## 11. AI Workflow

```txt
User
  |
  v
Company Name
  |
  v
Backend Validator
  |
  v
Master Prompt
  |
  v
Gemini 2.5 Flash
  |
  v
Google Search Grounding
  |
  v
Structured JSON
  |
  v
MongoDB
  |
  v
React UI
```

## 12. Prompt Engineering

The prompt in `prompts/masterPrompt.js` instructs Gemini to return only valid JSON.

The required report sections are:

- Company overview
- Business information
- Business challenges
- AI opportunities
- CEO pitch
- Sources

The prompt also instructs Gemini to:

- Avoid generic answers
- Base recommendations on the company's business model and market context
- Keep output concise but informative
- Return empty strings or arrays when information is unavailable
- Avoid markdown and code blocks

## 13. AI Tools Used

- Google Gemini 2.5 Flash
- Google Search grounding
- Prompt engineering
- ChatGPT/Codex for development assistance

## 14. Installation

Install backend dependencies:

```bash
cd backend/AI-APP
npm install
```

Install frontend dependencies:

```bash
cd frontend
npm install
```

## 15. Environment Variables

Create `backend/AI-APP/.env` locally using `.env.example`.

```txt
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:5173
```

Security notes:

- `.env` is ignored by git.
- `.env.example` is safe to commit because it contains placeholders only.
- Do not commit real MongoDB credentials or API keys.
- In production, set `CLIENT_URL` to the deployed frontend URL.

## 16. Running

Run backend:

```bash
cd backend/AI-APP
npm start
```

Backend URL:

```txt
http://localhost:5000
```

Run frontend:

```bash
cd frontend
npm run dev
```

Frontend URL:

```txt
http://localhost:5173
```

Development backend command:

```bash
cd backend/AI-APP
npm run dev
```

Production backend command:

```bash
cd backend/AI-APP
npm start
```

## 17. Challenges

- Ensuring Gemini returns valid JSON
- Preventing generic AI recommendations
- Keeping recommendations company-specific
- Handling failed AI responses cleanly
- Storing reports and search history consistently
- Protecting API keys and database credentials
- Keeping frontend and backend API contracts aligned

## 18. Solutions

- Strict JSON-only master prompt
- Google Search grounding for latest public information
- Mongoose schemas for consistent report structure
- `express-validator` for request validation
- Layered backend structure with controller, services, models, routes, and validators
- Safe search history logging for both success and failed requests
- `.gitignore` and `.env.example` for secure environment variable handling
- Production `npm start` uses `node server.js`, while `npm run dev` uses `nodemon`

## 19. Future Improvements

- Authentication and user-specific history
- Dashboard analytics
- PDF export for generated reports
- Report sharing links
- Scheduled company research
- Email delivery of CEO pitch
- Admin panel for report management
- Environment-based frontend API URL
- More detailed error logging and monitoring
