# AI Video Summarizer

🎬 LLM-Powered YouTube Video Analysis Tool - A modern, production-grade application that extracts transcripts from YouTube videos and generates structured, insightful summaries using AI.

![Dark Theme UI](https://img.shields.io/badge/UI-Dark_Theme-black?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue?style=for-the-badge&logo=typescript)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Node](https://img.shields.io/badge/Node-18+-339933?style=for-the-badge&logo=node.js)

## 🎬 Demo

[Press here to watch demo](https://github.com/user-attachments/assets/d0daff27-ae0d-4e68-a7a3-d29dc8a99153)


## ✨ Features

- 🎥 **Automatic Transcript Extraction** - Fetch captions from any YouTube video
- 🤖 **AI-Powered Analysis** - GPT-4 Turbo or Google Gemini for intelligent summarization
- 📊 **Structured Insights** - Main points, key insights, actionable takeaways, and timestamps
- 🎨 **Modern Dark UI** - Beautiful glassmorphism design with smooth animations
- ⚡ **Fast & Reliable** - Built with TypeScript, React, and Express
- 🔒 **Type-Safe** - End-to-end type safety with Zod validation

## 🖼️ Screenshots

### Modern Dark Theme Interface

The app features a sleek dark theme with glassmorphism effects, gradient accents, and smooth animations.

**Main Interface:**

- Large, modern hero section with gradient text
- Clean input field with red accent buttons
- Real-time loading states with smooth transitions

**Summary Display:**

- Color-coded sections (Blue: Main Points, Yellow: Insights, Green: Takeaways, Purple: Timestamps)
- Glassmorphism cards with hover effects
- Icon badges and gradient text for visual hierarchy

## 🚀 Overview

Transform any YouTube video into actionable insights with AI. This full-stack TypeScript application:

- Extracts transcripts from YouTube videos automatically
- Analyzes content using OpenAI GPT-4 or Google Gemini
- Generates structured summaries with key insights and takeaways
- Displays results in a beautiful, modern dark-themed interface

Perfect for students, researchers, content creators, or anyone who wants to quickly understand video content without watching the entire video.

### Quick Start

```bash
# Clone the repo
git clone https://github.com/hamza7malik/ai-video-summarizer.git
cd ai-video-summarizer

# Run setup script
chmod +x setup.sh
./setup.sh

# Add your API key to backend/.env
# Then start both servers:
cd backend && npm run dev    # Terminal 1
cd frontend && npm run dev   # Terminal 2
```

Visit `http://localhost:5173` and paste any YouTube URL!

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                            │
│  (Vite + React + TypeScript + shadcn/ui + TailwindCSS)    │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │  UI Layer    │  │ React Query  │  │  Zustand Store  │  │
│  │ (Components) │  │  (API State) │  │  (Local State)  │  │
│  └──────────────┘  └──────────────┘  └─────────────────┘  │
│            │               │                   │            │
│            └───────────────┴───────────────────┘            │
│                            │                                │
│                      [Axios Client]                         │
└────────────────────────────┼────────────────────────────────┘
                             │
                  HTTP POST /api/summarize
                             │
┌────────────────────────────┼────────────────────────────────┐
│                         Backend                             │
│        (Node.js + Express + TypeScript + Axios)            │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │  Controller  │→ │   Services   │→ │   External APIs │  │
│  │  (Routing)   │  │  (Business   │  │  - YouTube API  │  │
│  │              │  │    Logic)    │  │  - OpenAI/Gemini│  │
│  └──────────────┘  └──────────────┘  └─────────────────┘  │
│         │                  │                   │            │
│    [Validation]      [Processing]       [Integration]      │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **User Input**: User submits YouTube video URL via frontend form
2. **Validation**: Zod schema validates URL format on both client and server
3. **Video ID Extraction**: Backend extracts video ID from URL
4. **Transcript Fetching**: Retrieve video transcript using `youtube-transcript-plus`
5. **Transcript Processing**: Format transcript text for LLM consumption
6. **Provider Selection**: Factory creates appropriate LLM provider (OpenAI or Gemini)
7. **LLM Analysis**: Send transcript to selected provider with structured prompt
8. **Response Parsing**: Parse JSON response from LLM
9. **UI Rendering**: Display structured summary with insights and takeaways

## 📦 Tech Stack

### Frontend

- **Vite**: Fast build tool and dev server
- **React 18**: UI library with hooks
- **TypeScript**: Type safety throughout
- **shadcn/ui**: High-quality Radix + Tailwind components
- **TailwindCSS**: Utility-first styling with custom dark theme
- **Zustand**: Lightweight state management
- **React Query (TanStack Query)**: Server state management
- **Axios**: HTTP client
- **Zod**: Runtime schema validation
- **Lucide React**: Beautiful icon system

### Backend

- **Node.js + TypeScript**: Runtime and language
- **Express**: Web framework
- **youtube-transcript-plus**: Reliable transcript extraction (as of Dec 2025)
- **LLM Providers**:
  - **OpenAI SDK**: GPT-4 Turbo integration
  - **Google Generative AI**: Gemini integration
- **Factory Pattern**: Extensible provider abstraction
- **Zod**: Request validation
- **dotenv**: Environment configuration

## 🎯 Prompt Design

The LLM prompt is carefully engineered for high-quality video summarization:

### System Prompt

```
You are an expert content analyst specializing in video summarization.

Rules:
- Base your analysis strictly on the provided transcript.
- Do NOT invent or assume information not present in the transcript.
- Be concise, informative, and practical.
- Extract key themes, insights, and actionable takeaways.
- Focus on what matters: main ideas, learning opportunities, and practical applications.
```

### Output Structure

The LLM returns structured JSON with:

- **summary**: High-level overview
- **main_points**: Key topics covered
- **key_insights**: Notable learnings and discoveries
- **actionable_takeaways**: Practical applications
- **notable_timestamps**: Important moments (if applicable)

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **LLM API Key**: OpenAI or Google Gemini

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/ai-video-summarizer.git
cd ai-video-summarizer
```

2. **Backend Setup**

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Configure environment variables
# Required: LLM_PROVIDER (openai or gemini)
# Required: OPENAI_API_KEY or GEMINI_API_KEY
```

3. **Frontend Setup**

```bash
cd ../frontend
npm install

# Create .env file
cp .env.example .env

# Configure API URL (default: http://localhost:4000)
```

### Environment Variables

#### Backend (.env)

```bash
# LLM Configuration
LLM_PROVIDER=openai
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4-turbo-preview

# Or use Gemini
# LLM_PROVIDER=gemini
# GEMINI_API_KEY=...
# GEMINI_MODEL=gemini-1.5-pro

# Server
PORT=4000
NODE_ENV=development
```

#### Frontend (.env)

```bash
VITE_API_URL=http://localhost:4000
```

### Running Locally

**Development Mode**

Terminal 1 (Backend):

```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):

```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173`

**Production Mode**

```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
npm run preview
```

## 📁 Project Structure

```
ai-video-summarizer/
├── backend/
│   ├── src/
│   │   ├── app.ts                    # Express app setup
│   │   ├── server.ts                 # Server entry point
│   │   ├── config/
│   │   │   └── env.ts                # Environment validation
│   │   ├── controllers/
│   │   │   ├── summary.controller.ts # HTTP handlers
│   │   │   └── index.ts
│   │   ├── routes/
│   │   │   └── summary.route.ts      # API routes
│   │   ├── schemas/
│   │   │   └── review.schema.ts      # Zod validation
│   │   ├── services/
│   │   │   ├── youtube.service.ts    # Transcript fetching
│   │   │   ├── summary.service.ts    # Business logic
│   │   │   ├── llm.service.ts        # LLM facade
│   │   │   ├── llm/
│   │   │   │   ├── base.ts           # Provider interface
│   │   │   │   ├── factory.ts        # Provider factory
│   │   │   │   ├── openai.provider.ts
│   │   │   │   └── gemini.provider.ts
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   └── review.ts             # TypeScript types
│   │   └── utils/
│   │       ├── chunkTranscript.ts    # Text chunking
│   │       ├── logger.ts             # Logging utility
│   │       └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── App.tsx               # Main component
│   │   │   └── providers/            # React context
│   │   ├── components/
│   │   │   ├── summary/              # Summary components
│   │   │   └── ui/                   # shadcn/ui components
│   │   ├── features/
│   │   │   └── summary/              # Feature module
│   │   │       ├── api.ts
│   │   │       ├── schema.ts
│   │   │       ├── store.ts
│   │   │       └── types.ts
│   │   ├── lib/
│   │   │   ├── axios.ts              # HTTP client config
│   │   │   └── utils.ts
│   │   └── styles/
│   │       └── globals.css
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## 🔧 API Reference

### POST `/api/summarize`

Analyze a YouTube video and return a structured summary.

**Request Body**

```json
{
  "videoUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}
```

**Response**

```json
{
  "summary": "Overview of the video content...",
  "main_points": ["First major topic discussed", "Second key concept"],
  "key_insights": ["Important learning or discovery", "Notable observation"],
  "actionable_takeaways": ["Practical step you can take", "Action item"],
  "notable_timestamps": [
    "00:02:15 - Introduction to concept",
    "00:10:30 - Key demonstration"
  ]
}
```

**Error Response**

```json
{
  "error": "Error message",
  "details": [...]
}
```

## 🛠️ Development

### Code Quality

```bash
# Backend linting
cd backend
npm run lint
npm run format

# Frontend linting
cd frontend
npm run lint
```

### Type Checking

```bash
# Backend
cd backend
npx tsc --noEmit

# Frontend
cd frontend
npx tsc --noEmit
```

## 📝 Design Patterns

- **Factory Pattern**: LLM provider abstraction
- **Service Layer**: Business logic separation
- **Feature-Based Structure**: Frontend module organization
- **Barrel Exports**: Clean import paths
- **Zod Validation**: Runtime type safety
- **Error Boundaries**: Graceful error handling

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 🔍 Known Issues & Notes

- **Transcript Availability**: The app requires videos to have captions/transcripts enabled
- **YouTube API Changes**: As of December 2025, most YouTube transcript npm packages are broken due to YouTube's anti-bot measures. This project uses `youtube-transcript-plus` which is currently maintained and working.
- **Rate Limits**: Be mindful of LLM API rate limits when processing multiple videos

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Built with modern TypeScript and React best practices
- LLM integration powered by OpenAI and Google Gemini
- UI components from shadcn/ui
- Transcript extraction via youtube-transcript-plus
- Design inspired by modern SaaS applications

---

**Note**: This project is for educational and portfolio purposes. Ensure compliance with YouTube's Terms of Service when extracting transcripts.
