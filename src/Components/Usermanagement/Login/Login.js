import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../App.css";
import userIcon from "../../../icons/user-icon.png";
import eyeIcon from "../../../icons/eye.png";
import closedEye from "../../../icons/closedEye.png";
const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [show, setShow] = useState("password")
     const togglePasswordVisibility = () => {
       setShowPassword(!showPassword);
       setShow(showPassword ? "password":"text")

     };
     
  const navigate = useNavigate(); 
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};
    if (formData.username.trim() === "") {
      newErrors.username = "Username is required.";
    }
    if (formData.password.trim() === "") {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    if (Object.values(newErrors).every((error) => error === "")) {
      const user = {
        username: formData.username,      
        password: formData.password,
      };
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
       if (data === "Invalid username or password.") {
          alert("Invalid username or password.");
        } else if (data.message === "Login successful.") {
         console.log(data);
         let logedUser = data;
          navigate("/main", { state: { logedUser } });
        } else {
          alert("data.message")
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Invalid username or password.");
      });

    }
  };

 
  return (
    <div className="usermanagementContainer">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <input
            id="usermanagementInputs"
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <img src={userIcon} alt="User Icon" />
        </div>
        {errors.username && <div className="error">{errors.username}</div>}
        <div className="inputContainer">
          <input
            id="usermanagementInputs"
            type={show}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <img
            src={showPassword ? eyeIcon : closedEye}
            alt="Eye Icon"
            onClick={togglePasswordVisibility}
          />
        </div>
        {errors.password && <div className="error">{errors.password}</div>}
        <input type="submit" value="Sign in" />
        <p>
          Don't have an account? <Link to="register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
