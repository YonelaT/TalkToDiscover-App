import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../App.css";
import userIcon from "../../../icons/user-icon.png";
import eyeIcon from "../../../icons/eye.png";
import emailIcon from "../../../icons/email.png";
import closedEye from "../../../icons/closedEye.png";
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [show, setShow] = useState("password");
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setShow(showPassword ? "password" : "text");
  };
     
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
    if (formData.confirmPassword.trim() === "") {
      newErrors.confirmPassword = "Confirm Password is required.";
    }
    if (formData.email.trim() === "") {
      newErrors.email = "Email is required.";
    } else if (!formData.email.includes("@") || !formData.email.includes(".")) {
      newErrors.email = "Invalid email format.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password and Confirm Password do not match.";
    }

    setErrors(newErrors);
    if (Object.values(newErrors).every((error) => error === "")) {
      const user = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };
      fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => {
          if (response.status === 200) {
          navigate("/");
          } else {
            alert("Error: Something went wrong.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Error: Something went wrong.");
        });
    }
  };

  return (
    <div className="usermanagementContainer">
      <h2>Register</h2>
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
        </div>{" "}
        {errors.username && <div className="error">{errors.username}</div>}
        <div className="inputContainer">
          <input
            id="usermanagementInputs"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <img src={emailIcon} alt="Email Icon" />
        </div>{" "}
        {errors.email && <div className="error">{errors.email}</div>}
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
        <div className="inputContainer">
          <input
            id="usermanagementInputs"
            type={show}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <img
            src={showPassword ? eyeIcon : closedEye}
            alt="Eye Icon"
            onClick={togglePasswordVisibility}
          />
        </div>
        {errors.confirmPassword && (
          <div className="error">{errors.confirmPassword}</div>
        )}
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
