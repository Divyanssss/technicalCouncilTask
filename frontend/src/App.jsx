import React, { useState } from "react";
import Login from "./Login";
import Events from "./Events";
import CreateEvent from "./CreateEvent";
import "./styles.css";
import logo from "./assets/image.png";

function App() {
  // Simple initialization without arrow functions
  let initialPage = "login";
  const token = localStorage.getItem("token");
  if (token) {
    initialPage = "events";
  }
  
  let initialUser = null;
  const userStr = localStorage.getItem("user");
  if (userStr) {
    initialUser = JSON.parse(userStr);
  }
  
  const [page, setPage] = useState(initialPage);
  const [user, setUser] = useState(initialUser);

  function handleLogin(userInfo) {
    setUser(userInfo);
    localStorage.setItem("user", JSON.stringify(userInfo));
    setPage("events");
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setPage("login");
  }

  function handleCreateEvent() {
    setPage("create");
  }

  function handleBackToEvents() {
    setPage("events");
  }

  return (
    <div>
      <div className="navbar">
        <div style={{ flex: 1 }}></div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img 
            src={logo} 
            alt="NIT Trichy Logo" 
            style={{ 
              height: '60px', 
              marginRight: '20px',
              borderRadius: '6px'
            }} 
          />
          <span style={{ fontSize: '32px', fontWeight: 'bold' }}>NIT TRICHY NOTICE BOARD</span>
        </div>
        <div style={{ flex: 1 }}></div>
      </div>
      
      {/* Floating Logout Button */}
      {page !== "login" && (
        <button 
          onClick={handleLogout} 
          style={{ 
            position: 'fixed',
            top: '20px',
            right: '20px',
            width: 'auto',
            padding: '8px 16px',
            borderRadius: '20px',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(220, 53, 69, 0.3)',
            fontSize: '12px',
            fontWeight: '600',
            zIndex: 1000
          }}
        >
          Logout
        </button>
      )}
      
      {page === "login" && <Login onLogin={handleLogin} />}
      {page === "events" && <div className="container"><Events onCreateEvent={handleCreateEvent} user={user} /></div>}
      {page === "create" && <CreateEvent onBack={handleBackToEvents} user={user} />}
    </div>
  );
}

export default App; 