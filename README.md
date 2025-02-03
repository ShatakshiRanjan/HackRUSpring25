# 🐶 Virtual Pet Game – Task-Based Habit Tracker  

This is a **virtual pet game** where the pet's survival depends on the completion of daily tasks. Tasks reward coins, which can be used to feed the pet. If the pet isn't fed daily, it gets sad and eventually starves!  

🚀 **Features:**  
✅ **Complete tasks to earn coins** 🪙  
✅ **Use coins to buy food for your pet** 🐶  
✅ **Hunger & pet emotions change dynamically** 😃😐😢  
✅ **Real-time updates with WebSockets** 🔄  
✅ **Persistent data storage (SQLite + LocalStorage)** 💾  

---

## 🛠️ Installation & Setup  

Follow these steps to **run the Flask backend and React frontend** on your local machine.

---

## 📦 1. Clone the Repository  
```bash
git clone https://github.com/your-username/virtual-pet-game.git
cd virtual-pet-game
```

## 🐍 2. Setup & Run the Flask Backend
🔹 Step 1: Create a Virtual Environment (Recommended)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows, use venv\Scripts\activate
```

🔹 Step 2: Install Dependencies
```bash
pip install -r requirements.txt
```

🔹 Step 3: Run the Flask Server
```bash
python app.py
```
(The backend will start on http://127.0.0.1:5000/)

## ⚛️ 3. Setup & Run the React Frontend
🔹 Step 1: Install Dependencies
```bash
cd ../frontend
npm install
```

🔹 Step 2: Start the React App
```bash
npm start
```
(The frontend will run at http://localhost:3000/)

## 🌐 4. Open the App
Go to http://localhost:3000/ in your browser.
The game will automatically connect to the Flask backend.
Complete tasks, earn coins, and feed your pet! 🐶

## 🔄 How It Works
1) ✔️ Completing Tasks
Visit the Checklist page.
Check off tasks to earn 5-15 coins (based on difficulty).
Coins sync in real-time with the game.

2) 🍽️ Feeding Your Pet
Go to the Game Page.
Spend coins to buy food and increase hunger.
The pet reacts emotionally based on hunger level.

3) 🌅 New Day System
Every 10 minutes (or at midnight), hunger decreases.
Keep completing tasks to keep your pet happy! 🐾

## 🎯 Future Improvements
✅ Add pet customization (skins, accessories)
✅ Implement daily streak rewards
✅ Integrate Google sign-in for saved progress

# 🎉 Enjoy your Virtual Pet! 🐾💖
