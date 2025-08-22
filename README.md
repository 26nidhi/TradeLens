# 🚀 TradeLens

> A **modern, responsive stock market dashboard** displaying real-time stock prices, interactive charts, and market analytics with live WebSocket updates.

---

## 🌐 Live Demo
| Platform | Link |
|----------|------|
| Frontend | [Vercel](https://trade-lens-blue.vercel.app/) |
| Backend  | [Render](https://tradelens-7hio.onrender.com) |

---

## ✨ Features
- 💹 **Real-time Stock Prices** – Updates every 3 seconds via WebSocket  
- 📊 **Interactive Charts** – Dynamic historical stock charts using Plotly.js  
- 🏢 **Company Management** – Scrollable list of companies, select to view data  
- 📈 **Market Statistics** – Daily high/low, volume, price ranges, % changes  
- 🎨 **Responsive Design** – Glassmorphic UI with animated backgrounds  
- 🗄️ **Database Integration** – PostgreSQL stores company & stock data  
- ⚡ **Error Handling** – Robust connection management with retries  
- ⏳ **Loading States** – Smooth animations and connection status indicators  

---

## 🛠️ Tech Stack

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)

---
---

## 📝 Development Approach
TradeLens was developed iteratively using a **modular workflow**:

1. **Backend:** Node.js + Express APIs connected to PostgreSQL for persistent storage.  
2. **Real-Time Updates:** Socket.IO broadcasts live stock prices to all connected clients every few seconds.  
3. **Frontend:** React + Tailwind CSS provides a responsive UI with a scrollable company list and dynamic chart panel powered by Plotly.js.  
4. **State Management:** Carefully handled to combine historical and live data efficiently.  
5. **Deployment:** Frontend hosted on Vercel, backend on Render for smooth production operations.

This approach allowed incremental testing and ensured a robust, visually appealing, and interactive stock dashboard.

---

## ⚠️ Challenges Faced
- 🕒 **Real-time Data Sync:** Handling simultaneous updates without conflicts.  
- 🔄 **State Management:** Managing historical + live data streams and avoiding memory leaks.  
- 🔗 **API Architecture:** Seamlessly switching between mock data and real APIs.  
- 🌐 **CORS & WebSocket Config:** Compatible setups for both development & production.

---

## 🚀 Future Improvements
- Integrate real stock market APIs for fully live data  
- Add personalized dashboards & portfolio tracking  
- Implement predictive analytics & trend forecasting  

---

