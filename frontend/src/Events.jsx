import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./EventCard";
import "./styles.css";

function Events(props) {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Check if user is logged in
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await axios.get("/events");
        setEvents(res.data);
      } catch (err) {
        setError("Failed to fetch events");
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '80vh' }}>
      <h2 className="form-title">Events</h2>
      
      {loading && <div style={{ color: '#388e3c', marginBottom: '16px' }}>Loading...</div>}
      {error && <div className="error">{error}</div>}
      {events.length === 0 && !loading && <div>No events yet.</div>}
      {events.map(event => (
        <EventCard key={event._id} event={event} />
      ))}
      
      {/* Small Post Event button at bottom right */}
      <button 
        onClick={props.onCreateEvent} 
        style={{ 
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: 'auto',
          padding: '12px 20px',
          borderRadius: '50px',
          background: '#2c2c2c',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          fontSize: '14px',
          fontWeight: '600',
          zIndex: 1000
        }}
      >
        + Post Event
      </button>
    </div>
  );
}

export default Events; 