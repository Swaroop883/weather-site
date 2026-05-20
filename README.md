# 🌦️ SkyCheck Weather App

A full-stack weather application that allows users to search for real-time weather information for any city using the OpenWeatherMap API.

## 🚀 Live Demo

### Frontend (Vercel)
[https://weather-site-mu-rose.vercel.app](https://weather-site-mu-rose.vercel.app)

### Backend (Render)
[https://weather-backend-qfp7.onrender.com](https://weather-backend-qfp7.onrender.com)

---

# 📌 Features

- 🔍 Search weather by city name
- 🌡️ Real-time temperature display
- 💧 Humidity information
- 🌬️ Wind speed display
- ☁️ Weather condition descriptions
- 😀 Dynamic weather emojis/icons
- ⚠️ Error handling for invalid cities
- ⏳ Loading indicator while fetching data
- ⚡ Full frontend-backend integration
- 🌐 Fully deployed online

---

# 🛠️ Tech Stack

## Frontend
- HTML5
- CSS3
- Vanilla JavaScript

## Backend
- Node.js
- Express.js
- CORS
- Dotenv

## API
- OpenWeatherMap API

## Deployment
- Frontend → Vercel
- Backend → Render

---

# 📂 Project Structure

```bash
weather-app/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│
├── .gitignore
├── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Swaroop883/weather-site.git
```

---

## 2️⃣ Navigate into Project

```bash
cd weather-site
```

---

# 🔧 Backend Setup

## 1️⃣ Navigate to Backend

```bash
cd backend
```

## 2️⃣ Install Dependencies

```bash
npm install
```

## 3️⃣ Create `.env` File

Create a `.env` file inside the backend folder:

```env
API_KEY=your_openweathermap_api_key
```

---

## 4️⃣ Start Backend Server

```bash
node server.js
```

Backend runs on:

```bash
http://localhost:3000
```

---

# 💻 Frontend Setup

## 1️⃣ Navigate to Frontend

```bash
cd frontend
```

## 2️⃣ Open `index.html`

You can directly open:

```bash
index.html
```

or use VS Code Live Server.

---

# 🌍 API Endpoint

## Get Weather by City

```http
GET /weather?city=<city_name>
```

### Example

```http
http://localhost:3000/weather?city=Delhi
```

---

# 📦 Example JSON Response

```json
{
  "city": "Delhi",
  "temperature": "34.2°C",
  "description": "clear sky",
  "humidity": "45%",
  "windSpeed": "2.5 m/s"
}
```

---



# 👨‍💻 Author

### Sai Swaroop
Developed this project as a learning and hands-on experience project in full-stack web development to understand frontend-backend integration, REST APIs, deployment workflows, and real-world application architecture.
- GitHub: [Swaroop883](https://github.com/Swaroop883)

---

