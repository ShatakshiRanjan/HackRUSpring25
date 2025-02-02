import React, { useState, useEffect } from "react";
import "./Style.css";

const GamePage = () => {
  // 🥗 Load saved hunger & money or use defaults
  const [hunger, setHunger] = useState(() => parseInt(localStorage.getItem("hunger")) || 20);
  const [money, setMoney] = useState(() => parseInt(localStorage.getItem("money")) || 100); // Default: 100 coins
  const [pupilPosition, setPupilPosition] = useState({ x: 0, y: 0 });
  const [petImage, setPetImage] = useState("/pet_meh.png");
  const [isEating, setIsEating] = useState(false);

  // 🥕 Food Options
  const foodOptions = [
    { name: "🍏 Apple", cost: 5, hungerIncrease: 5 },
    { name: "🥕 Carrot", cost: 10, hungerIncrease: 10 },
    { name: "🍖 Meat", cost: 20, hungerIncrease: 25 },
  ];

  // 🛠 Update pet emotion based on hunger level
  useEffect(() => {
    setPetImage(hunger <= 25 ? "/pet_sad.png" : hunger <= 65 ? "/pet_nah.png" : "/pet_happy.png");
  }, [hunger]);

  // 💾 Save hunger & money to localStorage
  useEffect(() => {
    localStorage.setItem("hunger", hunger);
    localStorage.setItem("money", money);
  }, [hunger, money]);

  // 🥩 Feed Pet
  const handleFeedPet = (hungerIncrease, cost) => {
    if (money >= cost) {
      setMoney((prevMoney) => {
        const newMoney = prevMoney - cost;
        localStorage.setItem("money", newMoney); // Save new money state
        return newMoney;
      });

      setHunger((prevHunger) => {
        const newHunger = Math.min(prevHunger + hungerIncrease, 100);
        setPetImage("/pet_hehe.png");
        setIsEating(true);

        setTimeout(() => {
          setIsEating(false);
          setPetImage(newHunger <= 25 ? "/pet_sad.png" : newHunger <= 65 ? "/pet_nah.png" : "/pet_happy.png");
        }, 2000);

        return newHunger;
      });
    }
  };

  // 🔄 Simulate a New Day (Decrease Hunger, Add Money)
  const handleNewDay = () => {
    setHunger((prev) => {
      const newHunger = Math.max(prev - 30, 0); // Ensure hunger does not go below 0
      localStorage.setItem("hunger", newHunger); // Save to localStorage
      return newHunger;
    });

    setMoney((prev) => {
      const newMoney = prev + 50; // Give 50 coins per new day
      localStorage.setItem("money", newMoney); // Save to localStorage
      return newMoney;
    });

    console.log("🌅 New day started! Hunger decreased by 30. Money increased by 50.");
  };

  // 🔄 Auto Simulate New Day Every 10 Seconds (For Testing)
  useEffect(() => {
    const interval = setInterval(handleNewDay, 864000000); // Runs every 10 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // 👀 Eye Movement Effect
  const handleMouseMove = (e) => {
    const container = e.currentTarget.getBoundingClientRect();
    const centerX = container.left + container.width / 2;
    const centerY = container.top + container.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const angle = Math.atan2(dy, dx);
    const maxOffset = 20;
    const x = Math.cos(angle) * maxOffset;
    const y = Math.sin(angle) * maxOffset;
    setPupilPosition({ x, y });
  };

  // 🍽️ Handle Food Button Hover (Pet Gets Excited)
  const handleHover = () => {
    if (!isEating) setPetImage("/pet_eating.png");
  };

  // 🍽️ Handle Food Button Leave (Reset Pet Emotion)
  const handleHoverLeave = () => {
    if (!isEating) {
      setPetImage(hunger <= 25 ? "/pet_sad.png" : hunger <= 65 ? "/pet_nah.png" : "/pet_happy.png");
    }
  };

  return (
    <div className="game-container" onMouseMove={handleMouseMove}>
      <div className="money-container">
        <p>Coins: <span>{money}</span> 🪙</p>
      </div>

      <div className="food-shop">
        <h2>Food Options</h2>
        {foodOptions.map((food, index) => (
          <button
            key={index}
            className="food-item"
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverLeave}
            onClick={() => handleFeedPet(food.hungerIncrease, food.cost)}
            disabled={money < food.cost} // Disable button if not enough money
          >
            {food.name} ({food.cost} coins)
          </button>
        ))}
      </div>

      {/* 🌅 New Day Button */}
      <button className="new-day-button" onClick={handleNewDay}>🌅 Simulate New Day</button>

      <div className="pet-container">
        <img id="pet-image" src={petImage} alt="Virtual Pet" />

        <div className="eyes">
          <div className="eye">
            <div className="ball" style={{ transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)` }}></div>
          </div>
          <div className="eye">
            <div className="ball" style={{ transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)` }}></div>
          </div>
        </div>

        <p id="pet-status">
          {hunger <= 25 ? "Your pet is starving!" : hunger <= 65 ? "Your pet is still hungry!" : "Your pet is happy!"}
        </p>
      </div>

      <div className="progress-container">
        <p>Satisfaction Level</p>
        <div className="progress-bar">
          <div id="hunger-bar" style={{ width: `${hunger}%`, backgroundColor: hunger < 50 ? "red" : "green" }}></div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;

