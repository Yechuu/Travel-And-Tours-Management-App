import './SignUp.css'
import React, {useState} from 'react'
import { Link, useNavigate} from 'react-router-dom';


function SignUp() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSignup = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch("http://localhost:5000/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (res.ok) {
          alert("Signup successful");
          navigate("/login");
        } else {
          alert(data.message);
        }
      } catch (err) {
        alert("Signup failed");
      }
    };
  
    return (
      <form onSubmit={handleSignup}>
        <h2>Signup</h2>
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Signup</button>
        <p>Have an account? <Link to="/login">Login</Link></p>
      </form>
    );
  }

export default SignUp