// import './SignUp.css'
// import React, {useState} from 'react'
// import { Link, useNavigate} from 'react-router-dom';


// function SignUp() {
//     const navigate = useNavigate();
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("")
//     const [email, setEmail] = useState("");
//     const [role, setRole] = useState("");

//     const handleSignup = async (e) => {
//       e.preventDefault();
//       console.log(email, username, password, role)
//       try {
//         const res = await fetch("http://localhost:8000/api/account/auth/signup/", {
          
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email, username, password, role }),
//         });
//         const data = await res.json();
//         console.log(data)
//         if (res.ok) {
//           alert("Signup successful");
//           navigate("/login");
//         } else {
//           const key = Object.keys(data)[0];
//         const message = data[key][0];

//           console.log(key, message)
//           alert(message)
//         }
//       } catch (err) {
//         // console.log(err)
//       console.log("The error is ", err)
//         alert("Signup failed");
//       }
//     };
  
//     return (
//       <div className="login_container">
//       <div className="login_wrapper">
//         <h1 className="login_title">SIGN UP</h1>
//       <form onSubmit={handleSignup} className='signup_form'>
//         {/* <h2>Signup</h2> */}
//         <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="signup_input"/>
//         <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="signup_input"/>
//         <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="signup_input" />
//         <div className='signup_innerdiv'>
//         <label className='signup_label'>
//           <input
//             type="radio"
//             value="traveller"
//             checked={role === "traveller"}
//             onChange={(e) => setRole(e.target.value)}
//           />
//           Traveller
//         </label>
//         <label>
//           <input
//             type="radio"
//             value="agent"
//             checked={role === "agent"}
//             onChange={(e) => setRole(e.target.value)}
//           />
//           Agent
//         </label>
//       </div>
//         <button type="submit" className="signup_button">Signup</button>
//         <p>Have an account? <Link to="/login">Login</Link></p>
//       </form>
//       </div>
//       </div>
//     );
//   }

// export default SignUp

import './SignUp.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:8000/api/account/auth/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password, role }),
      });
      const data = await res.json();

      if (res.ok) {
        setSuccess("Signup successful! Please check your email to verify your account.");
        setTimeout(() => navigate("/login"), 3000); // Redirect after 3 seconds
      } else {
        // Handle backend validation errors (e.g., "username already exists")
        const key = Object.keys(data)[0];
        const message = data[key][0];
        setError(message || "Signup failed");
      }
    } catch (err) {
      setError("Signup error", err);
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="login_container">
      <div className="login_wrapper">
        <h1 className="login_title">SIGN UP</h1>
        
        {/* Success message (green) */}
        {success && <div className="signup_success">{success}</div>}
        
        {/* Error message (red) */}
        {error && <div className="signup_error">{error}</div>}

        <form onSubmit={handleSignup} className='signup_form'>
          <input 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="signup_input" 
          />
          <input 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="signup_input" 
          />
          <input 
            placeholder="Password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="signup_input" 
          />
          
          <div className='signup_innerdiv'>
            <label className='signup_label'>
              <input
                type="radio"
                value="traveller"
                checked={role === "traveller"}
                onChange={(e) => setRole(e.target.value)}
              />
              Traveller
            </label>
            <label>
              <input
                type="radio"
                value="agent"
                checked={role === "agent"}
                onChange={(e) => setRole(e.target.value)}
              />
              Agent
            </label>
          </div>
          
          <button type="submit" className="signup_button">Signup</button>
          <p>Have an account? <Link to="/login">Login</Link></p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;