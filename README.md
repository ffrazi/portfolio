# 🌌 My Portfolio

Welcome to the My Portfolio, a fully animated, access-controlled web application built to showcase my technical achievements. The project features a premium dark galaxy aesthetic and emphasizes smooth micro-interactions, responsive design, and robust security.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Vanilla CSS with custom glassmorphism and modern color tokens
- **Animations**: Framer Motion (page transitions, scroll effects) & GSAP (text burst effects)
- **3D Background**: Three.js & React Three Fiber (dynamic particle star field with parallax)
- **Backend & Auth**: Firebase Authentication & Firestore (admin access control and visitor logging)
- **Icons**: Lucide React

## ✨ Key Features

- **Interactive Galaxy Background**: A custom Three.js particle system featuring thousands of stars, constellation line connections, and mouse parallax effects.
- **Secure Access Control**: Complete Firebase authentication layer with Next.js middleware that gates access so only authorized emails can view the full portfolio.
- **Admin Dashboard**: A secure portal allowing the admin to easily whitelist visitor emails and monitor access logs.
- **Dynamic Animations**: Scroll-linked component reveals and complex hero burst sequences ensuring an immersive entry experience.
- **Performance Optimized**: Zero layout shifts and heavily optimized canvas rendering to ensure smooth FPS across devices.

## 🛠️ Local Development

### 1. Installation

Ensure you have Node.js installed, then install the dependencies:
```bash
cd portfolio-app
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the `portfolio-app` root directory and add your Firebase configuration:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
NEXT_PUBLIC_ADMIN_EMAIL=your_admin_email@example.com
```

### 3. Running the App

Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🌍 Deployment

This portfolio is optimized for Vercel deployment. Connect your GitHub repository to Vercel, ensure the environment variables from `.env.local` are transferred to Vercel's project settings, and deploy!

---
*Built with 💜 by Aneesa Zainab Fazulullah*
