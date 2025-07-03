import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

function Login(props) {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (isSignup) {
      try {
        await axios.post("/users/signup", form);
        alert("Signup successful! Please login.");
        setIsSignup(false);
        setForm({ name: "", email: "", password: "" });
      } catch (err) {
        let errorMessage = "Signup failed";
        if (err.response && err.response.data && err.response.data.message) {
          errorMessage = err.response.data.message;
        }
        setError(errorMessage);
      }
    } else {
      try {
        const res = await axios.post("/users/signin", { email: form.email, password: form.password });
        localStorage.setItem("token", res.data.token);
        // Fetch user info after login
        let userInfo = { email: form.email, name: "" };
        try {
          const userRes = await axios.get(`/users/me`, { headers: { Authorization: res.data.token } });
          userInfo = userRes.data;
        } catch (e) {
          // fallback: use email only
        }
        props.onLogin(userInfo);
      } catch (err) {
        let errorMessage = "Login failed";
        if (err.response && err.response.data && err.response.data.message) {
          errorMessage = err.response.data.message;
        }
        setError(errorMessage);
      }
    }
  }

  // Simple title and button text
  let titleText = "Login";
  if (isSignup) {
    titleText = "Signup";
  }
  
  let buttonText = "Login";
  if (isSignup) {
    buttonText = "Signup";
  }
  
  let switchText = "Don't have an account? Signup";
  if (isSignup) {
    switchText = "Already have an account? Login";
  }

  return (
    <div className="centered-page">
      <div className="container">
        <h2 className="form-title">{titleText}</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          )}
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <button type="submit">{buttonText}</button>
        </form>
        <button onClick={() => setIsSignup(!isSignup)} style={{ background: "#fff", color: "#388e3c", border: "1px solid #388e3c" }}>
          {switchText}
        </button>
      </div>
    </div>
  );
}

export default Login; 