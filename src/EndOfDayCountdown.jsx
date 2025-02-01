import React from "react";
import Countdown from "react-countdown";

const EndOfDayCountdown = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24,0,0,0);

    return (
        <div style={{fontSize: "24px", fontFamily: "Arial, sans-serif", backgroundColor: "white", color:"red"}}>
            <h2 style={{color:"black"}}>Countdown</h2>
            <Countdown date={midnight}/>
        </div>
    )
}
export default EndOfDayCountdown;