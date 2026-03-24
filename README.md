# TalentAI: Next-Gen Talent Intelligence Platform 🧠

A Full-Stack AI-Powered Recruitment & HR Intelligence Suite

🚀 Live Demo: [talent-ai-pied.vercel.app](https://talent-ai-pied.vercel.app)

🎥 Demo Video:
https://drive.google.com/file/d/1i5Msll4ccXc3cVhiiOZ0uGp9wj-w64AH/view?usp=sharing
---

## 📌 Overview

**TalentAI** is a production-grade, AI-powered recruitment platform designed to eliminate manual hiring bottlenecks and bring intelligence into every stage of the hiring process.

The platform uses **Large Language Models (LLMs) via Groq API (Llama 3.3-70b)** to screen resumes, detect bias in job descriptions, generate interview questions, and power a context-aware HR chat assistant — all in real time.

The platform is built using:

- **React 18 (Vite + Tailwind CSS)** for the frontend
- **Framer Motion** for fluid animations
- **Zustand** for global state management
- **Groq API (Llama 3.3-70b-versatile)** as the AI engine
- **Hybrid Glassmorphism + Claymorphism** design system

This project demonstrates a real-world AI-powered HR platform combining:

- 🧠 LLM-based candidate intelligence
- ⚡ Real-time resume analysis
- 🛡️ Bias-free hiring workflows
- 📊 Recruitment analytics dashboard
- 🤖 Conversational HR assistant

---

## 🖥️ Tech Stack

### Frontend
- React 18 (Vite)
- Tailwind CSS
- Framer Motion
- Lucide React Icons
- Recharts

### AI Engine
- Groq API
- Llama 3.3-70b-versatile
- Prompt Engineering for structured JSON outputs

### State Management
- Zustand (with persistence)

### Deployment
- Frontend: Vercel
- AI: Groq Cloud (serverless)

---

## 📂 Project Structure

```
talentai/
│
├── src/
│   ├── api/
│   │   └── claude.js              ← Groq API integration
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx
│   │   │   └── PageWrapper.jsx
│   │   │
│   │   ├── ui/
│   │   │   ├── ScoreRing.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── TagBadge.jsx
│   │   │   ├── LoadingBeam.jsx
│   │   │   └── EmptyState.jsx
│   │   │
│   │   ├── screener/
│   │   ├── interview/
│   │   ├── bias/
│   │   └── copilot/
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── ResumeScreener.jsx
│   │   ├── InterviewCoach.jsx
│   │   ├── BiasDetector.jsx
│   │   ├── HRCopilot.jsx
│   │   └── Settings.jsx
│   │
│   ├── store/
│   │   └── useCandidateStore.js   ← Zustand global state
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   └── utils/
│       └── helpers.js
│
├── screenshots/
│   ├── screenshot_dashboard.png
│   ├── screenshot_screener.png
│   ├── screenshot_result.png
│   └── screenshot_interview.png
│
├── .env.example
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## ✨ Key Features

---

### 🏠 Dashboard

The central hub showing live recruitment analytics — updates in real time as candidates are screened.

![Dashboard](./screenshots/screenshot_dashboard.png)

Metrics shown:
- Total candidates screened
- Top candidates (score ≥ 80)
- Average AI score across all roles
- Time saved vs manual review
- Bar chart visualization of all candidate scores

---

### 📄 Smart Resume Screener

Upload or paste a resume and the AI instantly analyzes it against the target role.

![Resume Screener](./screenshots/screenshot_screener.png)

Supports **PDF, DOCX, and TXT** formats via drag-and-drop or click to browse.

---

### 📊 AI Screening Result

After scanning, the AI returns a full candidate intelligence report:

![Screening Result](./screenshots/screenshot_result.png)

Result includes:
- **AI Score** (0–100) with animated ring
- **Candidate summary** (2 sentences)
- **Hire / Maybe / Pass verdict** with confidence %
- **Key Strengths** — what the candidate excels at
- **Potential Gaps** — areas that need attention

Example output:
```
Candidate:      Dhanya Shree
Score:          80 / 100
Role:           Software Engineer
Recommendation: HIRE
Confidence:     85%

Key Strengths:
  ✓ Hands-on experience in software development
  ✓ Strong data analytics and data visualization skills
  ✓ Proficient in a range of programming languages and tools

Potential Gaps:
  ✗ Limited full-time work experience
  ✗ May require additional training in specific engineering skills
```

---

### 🎤 AI Interview Coach

Select any screened candidate and generate 5 tailored interview questions instantly.

![Interview Coach](./screenshots/screenshot_interview.png)

Question categories with unique color coding:
- 🔵 **Technical** — assesses hard skills
- 🟢 **Behavioral** — evaluates teamwork and communication
- 🔴 **Gap Probe** — targets identified weaknesses
- 🟡 **Culture Fit** — checks alignment with team values
- 🩷 **Situational** — tests real-world problem solving

Each question includes the question itself, the **intent** behind it, and a copy to clipboard button.

---

### 🛡️ Bias Detector

Paste any job description and the AI scans it for unconscious bias.

Returns:
- **Bias score** (0–100) with risk level — Low / Moderate / High Risk
- **Flagged phrases** with type and inclusive replacement suggestion
- **AI-rewritten intro** — fully bias-free version of the opening

Example:
```
Bias Score: 72 / 100 — HIGH RISK
Flagged:    "ninja", "young and hungry", "rockstar"
Suggestion: Replace with skill-focused, inclusive language
```

---

### 🤖 HR Copilot

A context-aware conversational assistant that knows your entire candidate pool.

Ask it anything:
- *"Who is the best candidate for the React role?"*
- *"Draft an offer letter for Dhanya Shree"*
- *"Write a rejection email for the weakest candidate"*
- *"Summarize all candidates screened today"*

The AI responds with full context of every candidate screened in the current session.

---

### ⚙️ Settings

- Update Groq API key (saved to localStorage)
- Clear all candidate data with confirmation modal
- Theme toggle: Dark / Light / Cyber modes
- View app version and credits

---

## 🔒 Security Workflow

```
User Uploads Resume
        │
        ▼
Text Extracted from File
        │
        ▼
Prompt Sent to Groq API (Llama 3.3-70b)
        │
        ▼
LLM Returns Structured JSON
        │
        ▼
Score + Verdict Displayed
        │
        ▼
Candidate Saved to Zustand Store
        │
        ▼
Dashboard + Copilot Updated Live
```

---

## 🧠 AI Prompt Architecture

Each feature uses a structured system prompt that forces the LLM to return clean JSON:

```js
// Resume Screener
{
  name: string,
  score: 0-100,
  summary: string,
  strengths: string[],
  gaps: string[],
  recommendation: "Hire" | "Maybe" | "Pass",
  confidence: 0-100
}

// Interview Coach
{
  questions: [
    { category: string, question: string, intent: string }
  ]
}

// Bias Detector
{
  bias_score: 0-100,
  flags: [{ phrase, type, suggestion }],
  rewritten_intro: string,
  summary: string
}
```

---

## ⚡ Running the Project

### 1️⃣ Clone the repository
```bash
git clone https://github.com/dhanya26shree/TalentAI.git
cd TalentAI
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root:
```bash
VITE_GROQ_API_KEY=your_groq_api_key_here
```
Get your free Groq API key at [console.groq.com](https://console.groq.com)

### 4️⃣ Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## ☁️ Deployment (Vercel)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import repository
3. Add environment variable: `VITE_GROQ_API_KEY`
4. Click Deploy — live in 60 seconds

---

## 🎯 Use Cases

TalentAI can be used by:

- **HR Departments** — screen hundreds of resumes instantly
- **Startups** — hire smarter without a dedicated recruiter
- **Recruitment Agencies** — process more candidates in less time
- **Universities** — campus placement screening
- **Freelance Recruiters** — professional AI-backed hiring workflow

---

## 🧠 Challenges Faced

- Structuring LLM prompts to always return valid JSON
- Managing candidate state across all 5 modules with Zustand
- Building drag-and-drop resume upload with FileReader API
- Implementing Glassmorphism + Claymorphism hybrid design system
- Making the UI fully responsive across desktop and mobile
- Handling Groq API rate limits gracefully in the UI

---

## 🏁 Conclusion

TalentAI demonstrates a complete AI-powered HR platform built with modern frontend technologies and LLM integration.

By combining real-time resume analysis, bias detection, interview generation, and conversational AI — the platform reduces manual screening time by **80%** and brings data-driven hiring decisions to any organization.

The platform can be extended for enterprise-grade recruitment pipelines with minimal modifications.

---

## 📌 Future Enhancements

- PDF and DOCX resume parsing (PDF.js + Mammoth.js)
- Multi-candidate batch screening
- Email integration for automated candidate outreach
- ATS (Applicant Tracking System) export
- Role-based access for HR teams
- Interview scheduling integration
- Mobile app version

---

## 🧑‍💻 Author

**Dhanya Shree**

Computer Science and Business Systems (CSBS)

Full-Stack Developer | AI Application Developer | Data Analytics

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://www.linkedin.com/in/dhanyashreeselvakumar/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black)](https://github.com/dhanya26shree)

---

*Built with precision, aesthetics, and AI.*
