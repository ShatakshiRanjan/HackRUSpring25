import './About.css'
const About = () => {
  return (
    <div className="about-container">
      <div className="about-overlay">
        <h2>About Us</h2>
        <p>
          Welcome to <strong>Task Manager</strong>, where productivity meets fun! 
          Our mission is to make completing tasks rewarding by integrating a 
          <strong>virtual pet</strong> that thrives as you check off your to-do list.
        </p>

        <h3>Key Features</h3>
        <ul>
          <li>📝 Task Completion Rewards - Earn coins and feed your pet!</li>
          <li>🐾 Virtual Pet Care - Keep your pet happy and healthy.</li>
          <li>📊 Dashboard - Track your progress in an interactive way.</li>
          <li>🎯 Daily Challenges - Set goals and stay on track.</li>
        </ul>

        <h3>Meet the Developers</h3>
        <p>We are passionate about combining technology and habit-building:</p>
        <ul>
          <li><strong>Shatakshi Ranjan</strong>: Frontend & UI/UX</li>
          <li><strong>Jasmine Justin</strong>: Backend & API</li>
          <li><strong>Shreya Shukla</strong>: Full Stack & Integration</li>
        </ul>

        <h3>Our Vision</h3>
        <p>
          We believe that staying motivated and organized should be enjoyable. 
          With <strong>Task Manager</strong>, we aim to transform everyday productivity 
          into an engaging game, encouraging users to build habits one task at a time.
        </p>
      </div>
    </div>
  );
};

export default About;
