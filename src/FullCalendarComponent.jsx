/*import React from "react";
import FullCalendar from "@fullcalendar/react"; // Main FullCalendar component
import dayGridPlugin from "@fullcalendar/daygrid"; // Month view
import timeGridPlugin from "@fullcalendar/timegrid"; // Week and day views
import interactionPlugin from "@fullcalendar/interaction"; // For drag-and-drop
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";


const FullCalendarComponent = () => {
  const handleDateClick = (info) => {
    alert(`Clicked on date: ${info.dateStr}`);
  };

  const events = [
    { title: "Meeting", date: "2025-02-05" },
    { title: "Birthday Party", date: "2025-02-07" },
  ];

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth" // Default view
        events={events} // Pass events
        dateClick={handleDateClick} // Handle date clicks
      />
    </div>
  );
};

export default FullCalendarComponent;*/