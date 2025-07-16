# Mittweida Touring SPA

This is a Single Page Application (SPA) built with **React + Vite + TypeScript** for the frontend and **NestJS** for the backend. It allows users to explore food and historical places in Mittweida, swipe through content, like or save items, and fetch personalized data via REST APIs.

---

## 🛠️ Tools Used

### Frontend
- React
- TypeScript
- Vite
- Axios for API requests
- Wouter for client-side routing
- LocalStorage for login/session management

### Backend
- NestJS (Node.js framework)
- RESTful API
- In-memory or flat file data storage (no external database required)

---

## 📱 Accessing the App on Your Phone (via Local Network)

You can run the full SPA from your laptop and use it on your phone — as long as both are connected to the **same WiFi network**.

### 🧪 Setup Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/leonishard/mittweida_lenny

Create .env in the frontend/ folder:

env.
Copy
Edit: VITE_API_URL=http://<your-laptop-ip>:3001

Find your IP:
macOS:
ipconfig getifaddr en0
Linux:
hostname -I
Windows:
ipconfig

Start the backend (NestJS):

cd backend
npm install
npm run start
Start the frontend (Vite):

cd ../frontend
npm install
npm run dev 
Access the frontend from your phone:

Open your phone’s browser and visit:

cpp Copy Edit http://<your-laptop-ip>:5173