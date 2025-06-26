# 🏋️‍♂️ Trakr

**Trakr** is a personal fitness workout tracker that allows users to log their workouts, monitor their progress, and receive AI-powered fitness suggestions. This project also serves as a hands-on learning experience in full-stack web development.

## 🎯 Purpose

This app is being built as a way to **learn and practice full-stack web development**, focusing on modern tools and technologies used in real-world applications. As development progresses, the app will integrate both core features (workout logging, data visualization) and advanced AI tools for dynamic fitness advice.

## 🛠️ Tech Stack

| Tech        | Purpose |
|-------------|---------|
| **React**   | Frontend UI with component-based architecture |
| **Firebase**| User authentication and hosting (possibly Firestore for simple data storage) |
| **MongoDB** | NoSQL database for storing detailed workout logs (if not using Firestore) |
| **Node.js + Express** | API server to handle requests between frontend and database |
| **OpenAI API** | Used to provide smart workout suggestions and plan edits |

## 🔁 TypeScript Migration

**06/19/25** - Trakr was being written in .js/.jsx, but since has been fully migrated to **TypeScript**/.tsx. This overhaul was made to take advantage of:

- Type safety - catch bugs at compile time, not runtime
- Improved developer experience - with better IntelliSense and autocompletion
- Scalability - as the app grows, TypeScript makes code easier to maintain and refactor
- Industry alginment - most modern React codebases now use TypeScript by default

    resources that helped with migration:
    https://www.robinwieruch.de/vite-typescript/
    https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts

## 🚧 Features (In Progress)

- [x] User signup/login (Firebase Auth)
- [x] Workout logger (date, exercises, sets, reps, notes)
- [x] Progress history view
- [ ] Ask AI: "Improve my workout"
- [ ] AI-suggested routines based on goals

## 📚 Learning Goals

- Build and deploy a full-stack web application from scratch
- Understand component-based development using React + TypeScript
- Learn backend integration using Node.js and MongoDB
- Explore Firebase Auth and cloud tools
- Experiment with AI integration using OpenAI's API

---

> ⚠️ This project is in early development. The primary goal is **learning**, and **feedback** is welcome!