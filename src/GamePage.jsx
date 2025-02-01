import React from 'react';
import './Style.css'; // Import the existing CSS

const GamePage = () => {
  return (
    <>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" type="image/png" href="public/pet_base.png" />
  <title>Pet Palace</title>
  <link rel="stylesheet" href="style.css" />
  <div className="game-container">
    <div className="money-container">
      <p>
        Money: <span id="money">∞</span> coins
      </p>
    </div>
    <div className="pet-container">
      <img id="pet-image" src="public/pet-hungry.png" alt="Virtual Pet" />
      <p id="pet-status">Your pet is hungry!</p>
    </div>
    <div className="food-shop">
      <h2>Food Options</h2>
      <button className="food-item" data-cost={5} data-hunger={10}>
        🍏 Apple (5 coins)
      </button>
      <button className="food-item" data-cost={10} data-hunger={25}>
        🥕 Carrot (10 coins)
      </button>
      <button className="food-item" data-cost={20} data-hunger={50}>
        🍖 Meat (20 coins)
      </button>
    </div>
    <div className="progress-container">
      <p>Hunger Level</p>
      <div className="progress-bar">
        <div id="hunger-bar" />
      </div>
    </div>
  </div>
</>

  );
};

export default GamePage;
