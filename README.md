# 🚀 TalentAI: Next-Gen Talent Intelligence Platform

TalentAI is a production-grade, AI-powered recruitment suite designed to streamline HR workflows. Built with a cutting-edge "Hybrid Glassmorphism + Claymorphism" design, it leverages Large Language Models (LLMs) via the Groq API to provide instant, actionable insights for recruiters.

![TalentAI Preview](https://via.placeholder.com/1200x600?text=TalentAI+Recruitment+Suite+Preview)

## ✨ Core Features

- **📄 Smart Resume Screener**: Upload resumes in **PDF, DOCX, or TXT** format. Get instant scores, candidate summaries, and a recommendation verdict.
- **🎤 AI Interview Coach**: Generates 5 personalized interview questions (Technical, Behavioral, Situational, etc.) based on the specific strengths and gaps of a screened candidate.
- **🛡️ Bias Detector**: Scans job descriptions for unconscious bias, gendered primary language, or exclusionary patterns, providing inclusive rewrites.
- **🤖 HR Copilot**: A context-aware chat assistant that understands your candidate pool. Draft offer letters, rejection emails, or summarize your best talent.
- **🎨 Multi-Theme System**: Switch between **Dark**, **Light**, and high-contrast **Cyber** themes with persistence.
- **🔒 Enterprise Security**: API keys are never exposed to the client; they are managed through a secure server-side proxy (Vite proxy in dev, Vercel Serverless in production).

## 🛠️ Tech Stack

- **Frontend**: React 18 (Vite)
- **Styling**: Tailwind CSS + Custom Vanilla CSS Design System
- **Animations**: Framer Motion
- **State Management**: Zustand (with Persistence)
- **AI Engine**: Groq (Llama 3.3-70b-versatile)
- **File Parsing**: PDF.js & Mammoth.js

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- A Groq API Key ([Get one here](https://console.groq.com/keys))

### Installation

1. **Clone the repository**
   ```bash
   git clone "https://github.com/dhanya26shree/TalentAI.git"
   cd TalentAI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```bash
   VITE_GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

## ☁️ Deployment

This project is optimized for **Vercel**.

1.  Push your code to GitHub.
2.  Import your repository into Vercel.
3.  Add the Environment Variable: `VITE_GROQ_API_KEY`.
4.  **TalentAI** will automatically use the serverless functions in the `/api` folder to securely handle AI requests in production.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Built with precision and aesthetics.*
