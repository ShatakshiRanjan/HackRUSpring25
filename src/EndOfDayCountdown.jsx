import React from "react";
import Countdown from "react-countdown";
import './App.css'

const EndOfDayCountdown = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);

    // Custom renderer for Countdown
    const countdownRenderer = ({ hours, minutes, seconds }) => (
        <span>{hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</span>
    );

    return (
        <div className="countdown" style={{ fontSize: "24px", fontFamily: "Arial, sans-serif", backgroundColor: "white", color: "red", borderRadius: '15px', padding: '10px', textAlign: 'center', marginRight: '60px'}}>
            <h2 style={{ color: "black" }}>Countdown</h2>
            <Countdown date={midnight} renderer={countdownRenderer} />
        </div>
    );
};

export default EndOfDayCountdown;
