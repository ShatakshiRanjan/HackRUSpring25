import React, { useState } from "react";
import "./Style.css";

const GamePage = () => {
  const [hunger, setHunger] = useState(20); // Starting hunger level
  const [money] = useState(Infinity); // Unlimited money for now
  const [pupilPosition, setPupilPosition] = useState({ x: 0, y: 0 }); // State for pupil movement

  // Food options
  const foodOptions = [
    { name: "🍏 Apple", cost: 5, hungerIncrease: 5 },
    { name: "🥕 Carrot", cost: 10, hungerIncrease: 10 },
    { name: "🍖 Meat", cost: 20, hungerIncrease: 25 },
  ];

  // Feed the pet
  const handleFeedPet = (hungerIncrease) => {
    setHunger((prev) => Math.min(prev + hungerIncrease, 100)); // Max hunger is 100%
  };

  // Handle mouse movement to move the eyes
  const handleMouseMove = (e) => {
    const container = e.currentTarget.getBoundingClientRect();
    const centerX = container.left + container.width / 2;
    const centerY = container.top + container.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    const angle = Math.atan2(dy, dx);
    const maxOffset = 20; // Maximum pupil movement
    const x = Math.cos(angle) * maxOffset;
    const y = Math.sin(angle) * maxOffset;

    setPupilPosition({ x, y });
  };

  return (
    <div className="game-container" onMouseMove={handleMouseMove}>
      {/* Money Display */}
      <div className="money-container">
        <p>
          Coins: <span>{money}</span> 🪙
        </p>
      </div>

      {/* Pet Container */}
      <div className="pet-container">
        <img
          id="pet-image"
          src={
            hunger <= 25
              ? "pet_sad.png"
              : hunger <= 65
              ? "pet_nah.png"
              : "pet_happy.png"
          }
          alt="Virtual Pet"
        />

        {/* Eyes */}
        <div className="eyes">
          <div className="eye">
            <div
              className="ball"
              style={{
                transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
              }}
            ></div>
          </div>
          <div className="eye">
            <div
              className="ball"
              style={{
                transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
              }}
            ></div>
          </div>
        </div>

        {/* Pet Status */}
        <p id="pet-status">
          {hunger <= 25
            ? "Your pet is starving!"
            : hunger <= 65
            ? "Your pet is still hungry!"
            : "Your pet is happy!"}
        </p>
      </div>

      {/* Food Shop */}
      <div className="food-shop">
        <h2>Food Options</h2>
        {foodOptions.map((food, index) => (
          <button
            key={index}
            className="food-item"
            onClick={() => handleFeedPet(food.hungerIncrease)}
          >
            {food.name} ({food.cost} coins)
          </button>
        ))}
      </div>

      {/* Hunger Level Progress Bar */}
      <div className="progress-container">
        <p>Hunger Level</p>
        <div className="progress-bar">
          <div
            id="hunger-bar"
            style={{
              width: `${hunger}%`,
              backgroundColor: hunger < 50 ? "red" : "green",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
