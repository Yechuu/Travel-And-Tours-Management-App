import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import { useContext } from "react";

import './Login.css'

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await fetch("http://localhost:8000/api/account/auth/login/", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ username, password }),
  //     });
  //     const data = await res.json();
  //     if (res.ok) {
  //       console.log(data.access)
  //       localStorage.setItem("token", data.access);
  //       login(() => navigate("/"));
  //     } else {
  //       alert(data.message);
  //     }
  //   } catch {
  //     alert("Login failed");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/account/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      console.log("The data is ", data)

      const res1 = await fetch("http://localhost:8000/api/account/profile/", {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${data.access}` },
      });
      const data1 = await res1.json();
      console.log("The data1 is ", data1)
      if (res.ok) {
        login(() => navigate("/"), {
          access: data.access,
          refresh: data.refresh,
          user: {
            "id": data1.id,
            "username": data1.username,
            "role": data1.role
  }
        });
      } else {
        alert(data.message || "Login failed");
      }
    } catch {
      alert("Username or password is invalid");
    }
  };

  return (
    <div className="login_container">
      <div className="login_wrapper">
        <h1 className="login_title">SIGN IN</h1>
    <form onSubmit={handleSubmit} className="login_form">
      {/* <h2>Login</h2> */}
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="login_input" />
      <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" className="login_input" />
      <button type="submit" className="login_button" >Login</button>
    </form>
    <Link to='/signup'>Don't have an account ? Create now</Link>
    </div>
    </div>
  );
}
