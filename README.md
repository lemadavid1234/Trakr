# 🏋️‍♂️ Trakr

**Trakr** is a personal fitness workout tracker that allows users to log their workouts, monitor their progress, and receive AI-powered fitness suggestions. This project also serves as a hands-on learning experience in full-stack web development.

## 🎯 Purpose

This app is being built as a way to **learn and practice full-stack web development**, focusing on modern tools and technologies used in real-world applications. As development progresses, the app will integrate both core features (workout logging, data visualization) and advanced AI tools for dynamic fitness advice.

## 🛠️ Tech Stack

| Tech        | Purpose |
|-------------|---------|
| **React**   | Frontend UI with component-based architecture |
| **Firebase**| User authentication and hosting (possibly Firestore for simple data storage) |
| **json-server** | Mock REST API server for local development and testing |
| **free-exercise-db** | Open public domain exercise dataset (800+ exercises, images, instructions) |
| **Node.js + Express** | API server to handle requests between frontend and database (future/optional) |
| **OpenAI API** | Used to provide smart workout suggestions and plan edits |

## 🚀 Mock API Integration (Current Approach)

To simulate real-world API development and provide a robust, recruiter-friendly project, Trakr uses the [free-exercise-db](https://github.com/yuhonas/free-exercise-db) dataset served via a local mock API using [json-server](https://github.com/typicode/json-server):

- **Why this approach?**
  - Teaches RESTful API patterns, async data fetching, error handling, and integration testing
  - Simulates real-world frontend-backend separation
  - Enables fast, reliable local development with real exercise data (names, categories, images, instructions)
- **How it works:**
  - The app fetches and searches exercises from the mock API (e.g., `http://localhost:4000/exercises?name_like=bench`)
  - All exercise data and images are sourced from the free-exercise-db project
  - This setup can be swapped for a real API in the future with minimal code changes

## API Selection Rationale

**07/08/25** - I initially attempted to use the Wger API for exercise data. However, I encountered several issues:
- Many exercises lacked English names or had incomplete data
- The search endpoint returned broad or irrelevant results
- Data structure was inconsistent for our needs 

As a result, I switched to using the free-exercise-db dataset with a local mock API server for a more reliable and user-friendly experience.

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
- [ ] Exercise search/autocomplete using mock API (json-server + free-exercise-db)
- [ ] Ask AI: "Improve my workout"
- [ ] AI-suggested routines based on goals

## 📚 Learning Goals

- Build and deploy a full-stack web application from scratch
- Understand component-based development using React + TypeScript
- Learn backend integration using Node.js and MongoDB
- Explore Firebase Auth and cloud tools
- Experiment with AI integration using OpenAI's API
- Practice RESTful API development and testing with mock APIs
- Work with real-world, open data sources (free-exercise-db)

---

> ⚠️ This project is in early development. The primary goal is **learning**, and **feedback** is welcome!