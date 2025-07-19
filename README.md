# 🧬 Bayers Health Care

This monorepo contains 1 applications:

- 🥗 **Diet Planner Web** (Frontend)
- 🧠 **Backend API**

---

## 🖥️ Tech Stack

### Web App (Frontend)

- ⚡️ Next.js 15
- ⚛️ React 19
- ✨ JavaScript
- 💨 Bootstrap CSS
- 📏 ESLint (auto-fixes & sorts imports)

### Backend

- 🧩 Node.js (v18.16.0+)
- 🐬 MySQL
- 📦 Express.js (assumed)
- 🔐 dotenv

---

## 🚀 Prerequisites

- Install [Node.js](https://nodejs.org/en) v18.16.0 or higher
- [npm](https://www.npmjs.com/) (comes with Node.js)
- MySQL running locally or via Docker/cloud

Verify Node version:

```bash
node -v

Follow these steps to set up FrontEnd and Backend:

### 1. Clone the Repository

First, clone the repository containing the frontend and backend code to your local machine using Git:

```bash
git clone https://github.com/ajums/hackathon-bayerHealthCare.git
```

### Project Installation Dependencies

Install the required Node.js dependencies for the backend:

```bash
cd bayer-health-care
```


## Project Installation

```sh
# Install NPM dependencies
$ npm install
```


## Web App

### Running :: Web App [Watch Mode]

```sh
$ npm run dev
```

## ADD .env

Add your .env files according to the .env.example file of each service in backend.

```sh
# Route to module
http://localhost:3000/diet-planner
```

# How to Run Backend

This README.md file provides a step-by-step guide on how to run the backend of our project. To get started, please ensure you have the following prerequisites installed on your system:

- [Node.js](https://nodejs.org/) version 18 or higher


### 2. Install Dependencies

Install the required Node.js dependencies for the backend:

```bash
cd backend
```

```bash
npm install
```

### 3. Starting Backend

```sh
$ npm start
```

```sh
#incase if you are using pm2 you can start 
$ pm2 start index.js --watch
```
### 4. ADD .env

Add your .env files according to the .env.example file
