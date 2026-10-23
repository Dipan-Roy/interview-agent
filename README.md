# InterviewIQ.AI — Intelligent Full-Stack Mock Interview Platform

> An end-to-end AI-powered mock interview application that simulates real-world technical and behavioral interviews through adaptive question generation, real-time speech recognition, responsive virtual avatar interaction, multi-metric performance scoring, and downloadable PDF analytics.

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_9-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

---

Live Website : https://interview-agent-project.onrender.com

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Visual Showcase & Interface](#visual-showcase--interface)
- [System Architecture & Data Flow](#system-architecture--data-flow)
- [Technology Stack](#technology-stack)
- [Project Directory Structure](#project-directory-structure)
- [AI Engine & Prompt Engineering](#ai-engine--prompt-engineering)
- [Database Schema & Data Models](#database-schema--data-models)
- [REST API Reference](#rest-api-reference)
- [Getting Started Locally](#getting-started-locally)
  - [Prerequisites](#prerequisites)
  - [1. Clone Repository](#1-clone-repository)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
- [Environment Variables](#environment-variables)
- [Security & Quality Engineering](#security--quality-engineering)
- [Deployment Guidelines](#deployment-guidelines)
- [Engineering Limitations & Roadmap](#engineering-limitations--roadmap)
- [Author & License](#author--license)

---

## Overview

Securing software engineering and technical roles requires strong technical fundamentals, fluent communication, and composure under timed interview pressure. **InterviewIQ.AI** addresses this challenge by providing candidates with a realistic interview simulation environment. 

Candidates can customize their session by target job role, experience level, and interview track (Technical or HR Behavioral) or parse their actual resume to generate context-aware questions. During the session, candidates interact with an animated AI interviewer avatar using voice input, receive progressive difficulty prompts with dedicated response timers, and obtain instant, multi-dimensional feedback (Confidence, Communication, and Correctness) accompanied by actionable advice and downloadable PDF reports.

The project demonstrates full-stack architecture, combining React 19, Redux Toolkit, Tailwind CSS v4, Express 5, MongoDB, OpenRouter LLM orchestration (`gpt-4o-mini`), Web Speech APIs, and Razorpay payment integration.

---

## Key Features

- **Automated Resume Ingestion & Parsing**: Upload candidate resumes in PDF format. The backend extracts raw text using `pdfjs-dist` and leverages LLM extraction to isolate target roles, experience levels, key projects, and core technical skills.
- **Role-Tailored & Progressive Question Generation**: Dynamically formulates 5 progressive questions tailored to the candidate's exact profile, transitioning systematically from foundational concepts (Easy) to architectural and scenario-based inquiries (Hard).
- **Multimodal Voice & Avatar Simulation**:
  - **Speech-to-Text (STT)**: Continuous speech recognition via the browser's Web Speech API (`webkitSpeechRecognition`) transcribes candidate answers in real time.
  - **Text-to-Speech (TTS)**: Synthesizes conversational interviewer speech with human-like cadence and pitch pacing.
  - **Synchronized Video Avatars**: Female and male interviewer video avatars animate in real time while the AI is speaking and pause smoothly when awaiting the candidate's response.
- **Multi-Dimensional AI Evaluation Engine**: Evaluates candidate answers across three distinct criteria (Confidence, Communication, and Correctness) on a 0–10 scale, computing a weighted overall score with concise, human-like feedback.
- **Interview Timer & Pressure Simulation**: Dynamic countdown timers (60s to 120s based on question difficulty) simulate real interview pressure and automatically submit answers when the limit expires.
- **Analytics Dashboard & PDF Export**:
  - Recharts visual performance curves plotting score trends across interview stages.
  - Circular progress gauges highlighting overall score and skill category breakdowns.
  - Downloadable client-side A4 PDF reports generated via `jspdf` and `jspdf-autotable`.
- **Credit-Based Monetization & Razorpay Integration**:
  - New users receive an initial allocation of 100 free credits (each 5-question interview consumes 50 credits).
  - Razorpay order creation and HMAC SHA-256 cryptographic signature validation allow users to purchase credit top-ups securely.
- **Authentication & Secure Sessions**: Firebase Google OAuth integration coupled with HTTP-only JWT cookies to maintain authenticated user sessions across client and server.

---

## Visual Showcase & Interface

The platform incorporates purpose-built visual components and responsive UI elements designed with Tailwind CSS and Motion (Framer Motion).

| Capability | Visual | Description |
| :--- | :---: | :--- |
| **AI Answer Evaluation** | <img src="client/src/assets/ai-ans.png" width="220" alt="AI Evaluation" /> | Multi-metric scoring analyzing confidence, correctness, and communication clarity. |
| **Resume Intelligence** | <img src="client/src/assets/resume.png" width="220" alt="Resume Analysis" /> | Automated extraction of projects, roles, and skills from candidate PDF resumes. |
| **Performance Analytics** | <img src="client/src/assets/history.png" width="220" alt="Analytics History" /> | Historical interview logs tracking overall scores, interview modes, and timestamps. |
| **Downloadable PDF Reports** | <img src="client/src/assets/pdf.png" width="220" alt="PDF Report" /> | Structured summary reports detailing question-level feedback, metrics, and career advice. |
| **Interview Tracks** | <img src="client/src/assets/tech.png" width="110" alt="Technical Mode" /> &nbsp; <img src="client/src/assets/HR.png" width="110" alt="HR Mode" /> | Dual tracks targeting technical system design/coding concepts and behavioral HR competencies. |
| **Credit Monetization** | <img src="client/src/assets/credit.png" width="220" alt="Credits System" /> | Wallet and payment management supporting credit-based access to interview sessions. |

> *Note: Complete video avatars (`client/src/assets/videos/male-ai.mp4` and `female-ai.mp4`) are integrated directly into the interview loop to provide real-time lip-sync interaction.*

---

## System Architecture & Data Flow

InterviewIQ.AI operates on a decoupled client-server architecture with external integrations for AI inference, payment processing, and authentication.

```text
+---------------------------------------------------------------------------------------+
|                                    CLIENT (React 19)                                  |
|                                                                                       |
|   +-------------------+    +--------------------+    +----------------------------+   |
|   | Firebase Auth     |    | Redux Store        |    | Web Speech API             |   |
|   | (Google Popup)    |    | (User & Credits)   |    | (STT Input & TTS Audio)    |   |
|   +---------+---------+    +---------+----------+    +--------------+-------------+   |
|             |                        ^                              |                 |
|             | Axios (Credentials)    | State Updates                | Audio Loop      |
+-------------|------------------------|------------------------------|-----------------+
              |                        |                              |
              v                        |                              v
+---------------------------------------------------------------------------------------+
|                                   SERVER (Express 5)                                  |
|                                                                                       |
|   [isAuth Middleware] ---> [Routes: /auth, /user, /interview, /payment]               |
|                                     |                                                 |
|          +--------------------------+--------------------------+                      |
|          |                          |                          |                      |
|          v                          v                          v                      |
|   +---------------+         +---------------+          +---------------+              |
|   | Multer &      |         | OpenRouter    |          | Razorpay      |              |
|   | pdfjs-dist    |         | API Service   |          | Service       |              |
|   +-------+-------+         +-------+-------+          +-------+-------+              |
+-----------|-------------------------|--------------------------|----------------------+
            |                         |                          |
            v                         v                          v
     +--------------+       +-------------------+       +-----------------+
     | Parsed Text  |       | OpenRouter AI     |       | Razorpay API    |
     | from Resume  |       | (gpt-4o-mini)     |       | & HMAC SHA-256  |
     +--------------+       +-------------------+       +-----------------+
                                      |
                                      v
                             +------------------+
                             | MongoDB Database |
                             | (Mongoose 9)     |
                             | - Users          |
                             | - Interviews     |
                             | - Payments       |
                             +------------------+
```

### End-to-End User Journey

1. **Authentication**: The user logs in via Firebase Google OAuth. The client delivers Google credentials to `POST /api/auth/google`, creating or retrieving the MongoDB user record and setting an HTTP-only JWT cookie.
2. **Setup & Resume Parsing**:
   - The user selects an interview track (Technical or HR) and specifies experience and target role.
   - *Optional:* The user uploads a resume PDF. The backend (`POST /api/interview/resume`) parses the PDF via `pdfjs-dist`, triggers GPT-4o-mini to extract structured career data (role, projects, skills), and pre-populates the setup form.
3. **Question Generation**: Submitting the setup form calls `POST /api/interview/generate-questions`. The backend verifies the user has at least 50 credits, deducts the credits, invokes GPT-4o-mini to construct 5 conversational questions with progressive difficulty (Easy -> Medium -> Hard), and saves the new `Interview` document.
4. **Interactive Interview Execution**:
   - The virtual interviewer speaks an introduction via browser SpeechSynthesis while the avatar video plays.
   - Each question is presented sequentially with a countdown timer.
   - The user speaks their answer (transcribed via `webkitSpeechRecognition`) or types it into the response area.
5. **Real-Time Evaluation**: Calling `POST /api/interview/submit-answer` sends the answer and elapsed time to GPT-4o-mini. The model scores the response on Confidence, Communication, and Correctness and generates concise feedback, which is returned and spoken aloud.
6. **Session Finalization & Analytics**: Upon completing all 5 questions, `POST /api/interview/finish` aggregates metrics, calculates average scores, and marks the interview as `completed`. The user can inspect their performance curves, review question breakdowns, or export an A4 PDF report.

---

## Technology Stack

| Layer / Domain | Technology | Purpose in Project |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 19** | Core component-driven view layer and reactive user interface. |
| **Build & Tooling** | **Vite 7** | Development server, Fast Refresh (HMR), and production build bundler. |
| **Styling & Design** | **Tailwind CSS v4** | Utility-first styling integrated via `@tailwindcss/vite`. |
| **State Management** | **Redux Toolkit** | Centralized client state for authenticated user data, profile, and credits. |
| **Routing** | **React Router DOM 7** | Client-side routing across Landing, Auth, Interview, History, Pricing, and Report views. |
| **Animation** | **Motion (Framer Motion)** | Fluid page transitions, entry animations, modal transitions, and interactive cards. |
| **Charts & Progress** | **Recharts & Circular Progressbar** | Score trend area charts and circular gauges for performance analytics and timers. |
| **Document Generation** | **jsPDF & jspdf-autotable** | Client-side dynamic generation and download of formatted A4 PDF performance reports. |
| **Speech APIs** | **Web Speech API** | Native browser STT (`webkitSpeechRecognition`) and TTS (`speechSynthesis`) with voice auto-selection. |
| **Backend Runtime** | **Node.js (ESM)** | Server-side JavaScript runtime with ECMAScript module imports. |
| **Web Framework** | **Express 5** | REST API endpoints, routing, error handling, and cookie parsing middleware. |
| **Database & ODM** | **MongoDB & Mongoose 9** | NoSQL database persistence with strongly typed schemas for users, sessions, and payments. |
| **AI Orchestration** | **OpenRouter (`gpt-4o-mini`)** | Cloud LLM integration for resume data extraction, question generation, and 3-metric answer scoring. |
| **PDF Extraction** | **pdfjs-dist & Multer** | Multi-page PDF text extraction on uploaded candidate resumes with temporary disk caching. |
| **Authentication** | **Firebase Auth & JWT** | Client-side Google popup sign-in paired with server-side signed JWTs stored in HTTP-only cookies. |
| **Payment Gateway** | **Razorpay & Crypto** | Monetization gateway with Razorpay Orders API and HMAC SHA-256 signature verification. |

---

## Project Directory Structure

```text
interviewIQ/
├── client/                             # React 19 Frontend Application
│   ├── public/
│   │   └── img1.png                    # Favicon / Web Asset
│   ├── src/
│   │   ├── assets/                     # UI Illustrations & Media
│   │   │   ├── videos/                 # female-ai.mp4, male-ai.mp4
│   │   │   └── *.png                   # Feature illustrations (HR, tech, ai-ans, etc.)
│   │   ├── components/                 # Reusable UI & Workflow Components
│   │   │   ├── AuthModel.jsx           # Modal dialog wrapper for Google Authentication
│   │   │   ├── Footer.jsx              # Application footer
│   │   │   ├── Navbar.jsx              # Navigation header with credit wallet & user menu
│   │   │   ├── Step1SetUp.jsx          # Role configuration & resume upload/analysis step
│   │   │   ├── Step2Interview.jsx      # Video avatar, voice recognition, timer & question loop
│   │   │   ├── Step3Report.jsx         # Performance dashboard, charts & PDF download
│   │   │   └── Timer.jsx               # Circular countdown timer component
│   │   ├── pages/                      # Top-Level Page Views
│   │   │   ├── Auth.jsx                # Standalone Authentication page
│   │   │   ├── Home.jsx                # Landing page showcasing platform features
│   │   │   ├── InterviewHistory.jsx    # Historical interview records and past reports
│   │   │   ├── InterviewPage.jsx       # State container managing interview Steps 1 -> 3
│   │   │   ├── InterviewReport.jsx     # Route handler loading specific reports by ID
│   │   │   └── Pricing.jsx             # Credit plan selection & Razorpay checkout
│   │   ├── redux/                      # Redux State Store
│   │   │   ├── store.js                # Redux Toolkit store configuration
│   │   │   └── userSlice.js            # User authentication state & wallet credit tracker
│   │   ├── utils/
│   │   │   └── firebase.js             # Firebase client SDK initialization & Google Provider
│   │   ├── App.jsx                     # Top-level route definitions & current-user bootstrap
│   │   ├── index.css                   # Tailwind CSS v4 directives
│   │   └── main.jsx                    # Application entry point mounting to DOM
│   ├── index.html                      # HTML entry point including Razorpay script tag
│   ├── package.json                    # Frontend dependencies and build scripts
│   └── vite.config.js                  # Vite configuration with React & Tailwind plugins
│
└── server/                             # Node.js Express Backend
    ├── config/
    │   ├── connectDb.js                # Mongoose connection handler for MongoDB
    │   └── token.js                    # JWT token signing utility (7-day validity)
    ├── controllers/
    │   ├── auth.controller.js          # Google sign-in resolution & logout handlers
    │   ├── interview.controller.js     # Resume parsing, question generation & evaluation logic
    │   ├── payment.controller.js       # Razorpay order generation & signature validation
    │   └── user.controller.js          # Current user profile & credit balance fetcher
    ├── middlewares/
    │   ├── isAuth.js                   # JWT cookie verification middleware
    │   └── multer.js                   # Multer storage configuration (5MB limit)
    ├── models/
    │   ├── interview.model.js          # Interview session schema with embedded questions
    │   ├── payment.model.js            # Payment transaction history schema
    │   └── user.model.js               # User account schema with credit balance
    ├── public/                         # Temporary storage for uploaded resumes
    ├── routes/
    │   ├── auth.route.js               # /api/auth routes
    │   ├── interview.route.js          # /api/interview routes
    │   ├── payment.route.js            # /api/payment routes
    │   └── user.route.js               # /api/user routes
    ├── services/
    │   ├── openRouter.service.js       # OpenRouter Axios client invoking gpt-4o-mini
    │   └── razorpay.service.js         # Razorpay instance client initialization
    ├── index.js                        # Express server entry point, CORS & middleware binding
    └── package.json                    # Backend dependencies and scripts
```

---

## AI Engine & Prompt Engineering

The system integrates with OpenRouter's `openai/gpt-4o-mini` model through dedicated prompt pipelines:

### 1. Resume Entity Extraction
- **Input**: Raw text extracted across all pages of the candidate's PDF via `pdfjs-dist`.
- **System Instruction**: Enforces strict JSON extraction of four specific keys:
  ```json
  {
    "role": "string",
    "experience": "string",
    "projects": ["project1", "project2"],
    "skills": ["skill1", "skill2"]
  }
  ```
- **Cleanup**: The temporary PDF stored on disk is safely unlinked (`fs.unlinkSync`) immediately following extraction.

### 2. Progressive Question Generation
- **Input**: Candidate role, experience level, interview track (`HR` or `Technical`), projects, skills, and resume summary.
- **Rules**:
  - Exactly 5 practical, conversational questions without extraneous preamble.
  - Sentence length strictly controlled (15 to 25 words per question).
  - Explicit difficulty ladder:
    - **Q1 & Q2**: Easy (60s time limit)
    - **Q3 & Q4**: Medium (90s time limit)
    - **Q5**: Hard (120s time limit)

### 3. Tri-Metric Answer Evaluation
- **Input**: Question prompt, candidate's submitted answer, and response duration.
- **Evaluation Criteria (0 to 10 scale)**:
  - **Confidence**: Clarity, steadiness, and assertiveness in delivery.
  - **Communication**: Plain English articulation, conciseness, and structural coherence.
  - **Correctness**: Accuracy, relevance to the question, and depth of technical/behavioral concepts.
- **Output**: JSON payload containing all three scores, a computed `finalScore` (rounded average), and a 10–15 word actionable feedback note formatted for real-time Text-to-Speech playback.

---

## Database Schema & Data Models

The application persists data across three interconnected Mongoose schemas:

```text
+-----------------------+           +------------------------------------------+
|         User          |           |                Interview                 |
+-----------------------+           +------------------------------------------+
| _id         : ObjectId| 1       * | _id         : ObjectId                   |
| name        : String  |<----------| userId      : ObjectId (ref: User)       |
| email       : String  |           | role        : String                     |
| credits     : Number  |           | experience  : String                     |
| createdAt   : Date    |           | mode        : "HR" | "Technical"         |
| updatedAt   : Date    |           | resumeText  : String                     |
+-----------+-----------+           | finalScore  : Number                     |
            |                       | status      : "Incompleted"|"completed"  |
            | 1                     | createdAt   : Date                       |
            |                       | questions   : [                          |
            |                       |   {                                      |
            | *                     |     question     : String,               |
+-----------v-----------+           |     difficulty   : String,               |
|        Payment        |           |     timeLimit    : Number,               |
+-----------------------+           |     answer       : String,               |
| _id         : ObjectId|           |     feedback     : String,               |
| userId      : ObjectId|           |     score        : Number,               |
| planId      : String  |           |     confidence   : Number,               |
| amount      : Number  |           |     communication: Number,               |
| credits     : Number  |           |     correctness  : Number                |
| razorpay... : String  |           |   }                                      |
| status      : String  |           | ]                                        |
| createdAt   : Date    |           +------------------------------------------+
+-----------------------+
```

---

## REST API Reference

All protected endpoints require an active HTTP-only session cookie (`token`).

| Method | Endpoint | Protection | Request Payload / Params | Purpose & Response |
| :--- | :--- | :---: | :--- | :--- |
| `POST` | `/api/auth/google` | Public | `{ name, email }` | Authenticates user via Google OAuth, sets HTTP-only JWT cookie, returns user document. |
| `GET` | `/api/auth/logout` | Public | None | Clears the `token` cookie and ends the session. |
| `GET` | `/api/user/current-user` | Protected | None | Returns the authenticated user's profile and current credit balance. |
| `POST` | `/api/interview/resume` | Protected | `multipart/form-data` (`resume`: PDF file) | Parses PDF resume via `pdfjs-dist` and extracts `{ role, experience, projects, skills }`. |
| `POST` | `/api/interview/generate-questions` | Protected | `{ role, experience, mode, resumeText, projects, skills }` | Deducts 50 credits, generates 5 progressive questions, returns interview session payload. |
| `POST` | `/api/interview/submit-answer` | Protected | `{ interviewId, questionIndex, answer, timeTaken }` | Evaluates answer via LLM, persists question score/feedback, returns `{ feedback }`. |
| `POST` | `/api/interview/finish` | Protected | `{ interviewId }` | Finalizes interview, updates status to `completed`, computes category averages. |
| `GET` | `/api/interview/get-interview` | Protected | None | Fetches all past interview summaries for the authenticated user sorted by date descending. |
| `GET` | `/api/interview/report/:id` | Protected | `id` (Interview ObjectId param) | Retrieves complete scoring breakdown, skill scores, and feedback for a specific session. |
| `POST` | `/api/payment/order` | Protected | `{ planId, amount, credits }` | Creates a Razorpay order in paise and records a pending `Payment` document. |
| `POST` | `/api/payment/verify` | Protected | `{ razorpay_order_id, razorpay_payment_id, razorpay_signature }` | Validates HMAC SHA-256 signature, marks payment `paid`, increments user credit balance. |

---

## Getting Started Locally

### Prerequisites

Ensure you have the following installed on your local environment:
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB**: A running local instance (`mongodb://localhost:27017`) or a free [MongoDB Atlas](https://www.mongodb.com/atlas) connection string
- **OpenRouter API Key**: An account at [openrouter.ai](https://openrouter.ai/) with access to `openai/gpt-4o-mini`
- **Firebase Project**: A Firebase web project with Google Sign-In enabled
- **Razorpay Account**: A Razorpay account with Test Mode API Keys (`rzp_test_...`)

---

### 1. Clone Repository

```bash
git clone https://github.com/Dipan-Roy/interview-agent.git
cd interview-agent
```

---

### 2. Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Create your `.env` configuration file inside `server/`:
   ```bash
   # On Windows PowerShell
   New-Item -ItemType File -Name .env
   ```

4. Populate `server/.env` with your values (see [Environment Variables](#environment-variables)):
   ```env
   PORT=8000
   MONGODB_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/interviewiq?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret_key_min_32_characters
   OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxx
   RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
   ```

5. Start the backend development server with nodemon:
   ```bash
   npm run dev
   ```
   *The server starts on port `8000` (or `6000` by default) and connects to MongoDB.*

---

### 3. Frontend Setup

1. Open a new terminal window and navigate to the client directory:
   ```bash
   cd client
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Create your `.env` configuration file inside `client/`:
   ```bash
   # On Windows PowerShell
   New-Item -ItemType File -Name .env
   ```

4. Populate `client/.env` with your public keys:
   ```env
   VITE_FIREBASE_APIKEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxx
   VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxx
   ```

5. Verify that `ServerUrl` in `client/src/App.jsx` matches your backend port (default: `http://localhost:8000`).

6. Start the Vite development server:
   ```bash
   npm run dev
   ```

7. Open your browser and navigate to `http://localhost:5173`.

---

## Environment Variables

### Backend Configuration (`server/.env`)

| Variable | Description | Required | Example / Placeholder |
| :--- | :--- | :---: | :--- |
| `PORT` | HTTP port on which the Express server listens. Set to `8000` to align with frontend `ServerUrl`. | Yes | `8000` |
| `MONGODB_URL` | MongoDB connection URI (local instance or MongoDB Atlas cluster). | Yes | `mongodb://localhost:27017/interviewiq` |
| `JWT_SECRET` | Cryptographic secret key used to sign and verify session JSON Web Tokens. | Yes | `super_secret_jwt_key_random_string` |
| `OPENROUTER_API_KEY` | API token from OpenRouter used to execute `gpt-4o-mini` chat completions. | Yes | `sk-or-v1-abcdef123456...` |
| `RAZORPAY_KEY_ID` | Public test or live key ID generated in the Razorpay dashboard. | Yes | `rzp_test_51xxxxxxxxxxxx` |
| `RAZORPAY_KEY_SECRET` | Secret key generated in the Razorpay dashboard for signature generation. | Yes | `w8xxxxxxxxxxxxxxxxxxxxxx` |

### Frontend Configuration (`client/.env`)

| Variable | Description | Required | Example / Placeholder |
| :--- | :--- | :---: | :--- |
| `VITE_FIREBASE_APIKEY` | Firebase Web API key used to initialize Firebase Auth for Google popup sign-in. | Yes | `AIzaSyAxxxxxxxxxxxxxxxx` |
| `VITE_RAZORPAY_KEY_ID` | Razorpay public key ID used to open the client-side Razorpay payment modal. | Yes | `rzp_test_51xxxxxxxxxxxx` |

---

## Security & Quality Engineering

- **Cryptographic Payment Verification**: Payment confirmations are validated on the server using HMAC SHA-256 (`crypto.createHmac("sha256", secret)`). Credits are incremented in the database only after the computed signature matches `razorpay_signature`.
- **HTTP-Only Cookie Authentication**: JWT tokens are signed with a 7-day expiration and delivered to the client inside an `httpOnly` cookie, protecting the authentication token against Cross-Site Scripting (XSS) extraction.
- **File Upload Guardrails**: Multer is restricted to a 5MB maximum file size limit, and temporary uploaded PDF files are unlinked from the server filesystem immediately after text extraction.
- **CORS Policies**: Cross-Origin Resource Sharing is locked down to `http://localhost:5173` with explicit `credentials: true` support for cookie transmission.
- **Code Quality**: The client codebase includes ESLint 9 configuration with React Hooks and React Refresh lint rules. Run `npm run lint` inside `client/` to verify code quality.

---

## Deployment Guidelines

### Frontend (e.g., Vercel / Netlify / Render Static)
1. Configure build command: `npm run build`
2. Configure output directory: `dist`
3. Supply production environment variables (`VITE_FIREBASE_APIKEY`, `VITE_RAZORPAY_KEY_ID`).
4. Update `ServerUrl` in `client/src/App.jsx` to point to the production backend URL.

### Backend (e.g., Render / Railway / AWS EC2)
1. Add a production start script to `server/package.json`:
   ```json
   "scripts": {
     "start": "node index.js",
     "dev": "nodemon index.js"
   }
   ```
2. Configure environment variables (`PORT`, `MONGODB_URL`, `JWT_SECRET`, `OPENROUTER_API_KEY`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`).
3. For cross-domain deployments, update CORS origin in `server/index.js` to match the client's production domain and set cookie options:
   ```javascript
   res.cookie("token", token, {
     httpOnly: true,
     secure: true, // required on HTTPS
     sameSite: "none", // required when frontend & backend are on different domains
     maxAge: 7 * 24 * 60 * 60 * 1000
   });
   ```

---

## Engineering Limitations & Roadmap

- **Browser Speech Recognition Support**: The Web Speech API (`webkitSpeechRecognition`) is natively supported primarily on Chromium-based browsers (Google Chrome, Microsoft Edge, Brave). Implementing a fallback (such as an audio recorder uploading to an OpenAI Whisper endpoint) would enable cross-browser support for Safari and Firefox.
- **Stateless PDF File Processing**: Uploaded resumes are stored temporarily in `server/public/` before deletion. For production horizontal scaling, migrating to direct in-memory buffers or secure cloud storage (AWS S3 with pre-signed URLs) is recommended.
- **Asynchronous Payment Webhooks**: The current implementation verifies payments synchronously through the client-facing modal callback. Adding a dedicated Razorpay Webhook endpoint (`/api/payment/webhook`) will safeguard against credit drop-offs caused by network disconnects or browser closes before the callback resolves.
- **Adaptive Follow-Up Questions**: The current question pipeline generates 5 questions in advance. A future milestone could dynamically generate each subsequent question based on the candidate's previous response for a more reactive conversational interview experience.

---

## Author & License

- **Developer**: Dipan Roy ([@Dipan-Roy](https://github.com/Dipan-Roy))
- **Repository**: [interview-agent](https://github.com/Dipan-Roy/interview-agent)
- **License**: Released under the [ISC License](https://opensource.org/licenses/ISC).
