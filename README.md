# Advance Engineering Company - Official Website

![Project Status](https://img.shields.io/badge/status-active-success)
![Version](https://img.shields.io/badge/version-0.0.0-blue)
![Tech Stack](https://img.shields.io/badge/stack-React_Vite_Supabase-orange)

The official web platform for **Advance Engineering Company**, an Indian engineering firm credentialed by RDSO (Research Designs and Standards Organisation). This project showcases the company's role in the **Make in India** initiative, specifically focusing on **Instrumented Measuring Wheelsets (IMWs)** for Indian Railways.

The application is a high-performance, single-page application (SPA) featuring advanced animations, interactive 3D-like elements, and a custom AI-powered virtual assistant.

---

## 📑 Table of Contents
- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Technological Foundation](#-technological-foundation)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
- [Development Scripts](#-development-scripts)
- [AI Chatbot Integration](#-ai-chatbot-integration)
- [Business Context](#-business-context)

---

## 🏢 About the Project

Advance Engineering Company is a pioneer in the Indian transport sector, specializing in precision testing equipment. This website serves as both a corporate portfolio and a client communication tool.

**Mission:** "Passionate about Precision Technology" — Challenging the status quo to craft a new legacy for India's transport sector.

**Core Objectives:**
* Highlight the **RDSO certification** and partnership with Indian Railways.
* Showcase domestic manufacturing capabilities (Make in India).
* Provide instant customer support via an AI agent capable of answering technical and corporate queries.

---

## 🌟 Key Features

### 🎨 Frontend Excellence
* **Immersive Hero Section**: Features scroll-triggered parallax effects and scale transformations using `framer-motion`.
* **Interactive Carousel**: A custom-built, auto-playing image slider with direction-aware transitions to showcase Measuring Wheelsets and Labs.
* **Scroll Animations**: Elements fade in and slide up as the user traverses the page (`AnimatedSection` component).
* **Responsive Design**: Mobile-first architecture using Tailwind CSS, ensuring perfect rendering on devices from phones to large displays.

### 🤖 Intelligent Backend
* **Context-Aware AI Assistant**: A chatbot built on Supabase Edge Functions that knows specific company details (Founders, Address, Capabilities) and answers user queries in real-time.
* **Streaming Responses**: The chat interface supports real-time text streaming for a natural conversational feel.

---

## 🛠 Technological Foundation

### Core Framework
* **[Vite](https://vitejs.dev/)**: For lightning-fast HMR (Hot Module Replacement) and optimized production builds.
* **[React 18](https://react.dev/)**: The library for web and native user interfaces.
* **[TypeScript](https://www.typescriptlang.org/)**: Ensures type safety and developer productivity.

### UI & Styling
* **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for rapid UI development.
* **[Shadcn UI](https://ui.shadcn.com/)**: Reusable components built using Radix UI and Tailwind CSS (Accordion, Dialog, Sheet, Toast, etc.).
* **[Framer Motion](https://www.framer.com/motion/)**: Production-ready motion library for React.
* **[Lucide React](https://lucide.dev/)**: Beautiful & consistent icons.

### State & Logic
* **[@tanstack/react-query](https://tanstack.com/query/latest)**: Powerful asynchronous state management for fetching/caching data.
* **[React Hook Form](https://react-hook-form.com/)**: Performant, flexible and extensible forms.
* **[Zod](https://zod.dev/)**: TypeScript-first schema declaration and validation library.

### Infrastructure
* **[Supabase](https://supabase.com/)**: Open source Firebase alternative. Used here for Edge Functions (Backend-as-a-Service).

---

## 📂 Project Architecture

```bash
advance-engg/
├── public/                 # Static assets (favicons, robots.txt)
├── src/
│   ├── assets/             # Project images (Vande Bharat, Lab photos)
│   ├── components/
│   │   ├── chat/           # AI Chatbot UI components
│   │   ├── layout/         # Structural components (Navbar, Footer)
│   │   └── ui/             # Shadcn UI primitives (Button, Card, Input...)
│   ├── hooks/              # Custom React hooks (use-toast, use-mobile)
│   ├── integrations/       # External service clients (Supabase)
│   ├── lib/                # Utility functions (cn, formatters)
│   ├── pages/              # Route views
│   │   ├── Home.tsx        # Landing page with parallax & carousel
│   │   ├── About.tsx       # Company history & profile
│   │   ├── Services.tsx    # detailed service offerings
│   │   ├── Careers.tsx     # Job openings
│   │   └── Contact.tsx     # Contact forms & info
│   ├── App.tsx             # Root component & Routing configuration
│   └── main.tsx            # Entry point
├── supabase/
│   └── functions/
│       └── chat/           # Deno Edge Function for AI logic
├── .env                    # Environment variables (git-ignored)
├── index.html              # HTML entry point
├── package.json            # Dependencies & Scripts
└── vite.config.ts          # Vite configuration
