import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

function CreateEvent(props) {
  
  let user = {};
  if (props.user) {
    user = props.user;
  }
  
  
  let initialName = "";
  if (user.name) {
    initialName = user.name;
  }
  
  let initialEmail = "";
  if (user.email) {
    initialEmail = user.email;
  }
  
  const [form, setForm] = useState({
    title: "",
    description: "",
    eventDate: "",
    eventTime: "",
    location: "",
    category: "",
    image: "",
    postedBy: {
      name: initialName,
      email: initialEmail,
      department: "",
      studentId: ""
    },
    contactInfo: {
      phone: "",
      additionalEmail: ""
    }
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    if (name.startsWith("postedBy.")) {
      setForm({ ...form, postedBy: { ...form.postedBy, [name.split(".")[1]]: value } });
    } else if (name.startsWith("contactInfo.")) {
      setForm({ ...form, contactInfo: { ...form.contactInfo, [name.split(".")[1]]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
   
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }
      
     
      if (!file.type.startsWith('image/')) {
        setError("Please select a valid image file");
        return;
      }

      const reader = new FileReader();
      reader.onload = function(event) {
        const base64 = event.target.result;
        setForm({ ...form, image: base64 });
        setImagePreview(base64);
        setError("");
      };
      reader.readAsDataURL(file);
    }
  }

  function removeImage() {
    setForm({ ...form, image: "" });
    setImagePreview("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("token");

      let eventDateForBackend = form.eventDate;
      if (eventDateForBackend && eventDateForBackend.includes('-')) {
        const parts = eventDateForBackend.split('-');
        if (parts.length === 3) {
       
          eventDateForBackend = `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
      }
    
      const payload = {
        title: form.title,
        description: form.description,
        eventDate: eventDateForBackend,
        eventTime: form.eventTime,
        location: form.location,
        category: form.category,
        image: form.image,
        postedBy: {
          name: form.postedBy.name,
          email: form.postedBy.email,
          department: form.postedBy.department,
          studentId: form.postedBy.studentId
        },
        contactInfo: {
          phone: form.contactInfo.phone,
          additionalEmail: form.contactInfo.additionalEmail
        }
      };
      await axios.post(
        "/events",
        payload,
        {
          headers: {
            Authorization: token
          }
        }
      );
      setSuccess("Event created!");
      
      let resetName = "";
      if (user.name) {
        resetName = user.name;
      }
      
      let resetEmail = "";
      if (user.email) {
        resetEmail = user.email;
      }
      
      setForm({
        title: "",
        description: "",
        eventDate: "",
        eventTime: "",
        location: "",
        category: "",
        image: "",
        postedBy: {
          name: resetName,
          email: resetEmail,
          department: "",
          studentId: ""
        },
        contactInfo: {
          phone: "",
          additionalEmail: ""
        }
      });
      setImagePreview("");
      setTimeout(() => {
        props.onBack();
      }, 1000);
    } catch (err) {
      let errorMessage = "Failed to create event";
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      }
      setError(errorMessage);
    }
  }

  return (
    <div className="centered-page">
      <div className="container">
        <h2 className="form-title">Create Event</h2>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
          <input name="eventDate" placeholder="Event Date (DD-MM-YYYY)" value={form.eventDate} onChange={handleChange} required />
          <input name="eventTime" placeholder="Event Time (e.g. 14:00)" value={form.eventTime} onChange={handleChange} required />
          <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
          <select name="category" value={form.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="Seminar">Seminar</option>
            <option value="Workshop">Workshop</option>
            <option value="Sports">Sports</option>
            <option value="Cultural">Cultural</option>
            <option value="Other">Other</option>
          </select>
          
          {/* Image Upload Section */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Event Photo (Optional)</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
              style={{ 
                border: '1px solid #dddddd', 
                padding: '8px', 
                borderRadius: '4px',
                backgroundColor: 'white'
              }}
            />
            {imagePreview && (
              <div style={{ marginTop: '12px' }}>
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  style={{ 
                    maxWidth: '200px', 
                    maxHeight: '200px', 
                    borderRadius: '4px',
                    border: '1px solid #dddddd'
                  }} 
                />
                <button 
                  type="button" 
                  onClick={removeImage}
                  style={{ 
                    marginLeft: '8px', 
                    padding: '4px 8px', 
                    background: '#ff4444', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
          
          <input name="postedBy.name" placeholder="Your Name" value={form.postedBy.name} onChange={handleChange} required />
          <input name="postedBy.email" placeholder="Your Email" value={form.postedBy.email} onChange={handleChange} required />
          <input name="postedBy.department" placeholder="Department (optional)" value={form.postedBy.department} onChange={handleChange} />
          <input name="postedBy.studentId" placeholder="Student ID (optional)" value={form.postedBy.studentId} onChange={handleChange} />
          <input name="contactInfo.phone" placeholder="Contact Phone (optional)" value={form.contactInfo.phone} onChange={handleChange} />
          <input name="contactInfo.additionalEmail" placeholder="Additional Email (optional)" value={form.contactInfo.additionalEmail} onChange={handleChange} />
          <button type="submit">Create Event</button>
        </form>
        <button onClick={props.onBack} style={{ background: "#fff", color: "#388e3c", border: "1px solid #388e3c" }}>Back to Events</button>
      </div>
    </div>
  );
}

export default CreateEvent; 