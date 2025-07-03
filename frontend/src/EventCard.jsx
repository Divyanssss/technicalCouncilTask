import React from "react";
import "./styles.css";

function formatDate(dateString) {
  if (!dateString) return "No date";
  const d = new Date(dateString);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

function EventCard({ event }) {
  // Format date as DD-MM-YYYY
  let dateText = formatDate(event.eventDate);
  
  // Add time if available
  if (event.eventTime) {
    dateText = dateText + " at " + event.eventTime;
  }
  
  // Simple name and email display
  let postedByText = "Unknown";
  if (event.postedBy && event.postedBy.name && event.postedBy.email) {
    postedByText = event.postedBy.name + " (" + event.postedBy.email + ")";
  }

  return (
    <div className="card">
      {event.image && (
        <div style={{ marginBottom: '16px', textAlign: 'center' }}>
          <img 
            src={event.image} 
            alt={event.title} 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '450px', 
              width: '100%',
              height: 'auto',
              borderRadius: '12px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.12)'
            }} 
          />
        </div>
      )}
      <div className="card-title">{event.title}</div>
      <div className="card-date">{dateText}</div>
      <div><b>Location:</b> {event.location}</div>
      <div><b>Category:</b> {event.category}</div>
      <div style={{ margin: '8px 0' }}>{event.description}</div>
      <div><b>Posted By:</b> {postedByText}</div>
      {event.postedBy && event.postedBy.department && <div><b>Department:</b> {event.postedBy.department}</div>}
      {event.postedBy && event.postedBy.studentId && <div><b>Student ID:</b> {event.postedBy.studentId}</div>}
      {event.contactInfo && event.contactInfo.phone && <div><b>Contact Phone:</b> {event.contactInfo.phone}</div>}
      {event.contactInfo && event.contactInfo.additionalEmail && <div><b>Additional Email:</b> {event.contactInfo.additionalEmail}</div>}
    </div>
  );
}

export default EventCard; 