import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../icons/logo.png";
import "../../App.css";
const Admin = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    key: "",
    description: "",
    information: "",
  });

  const [errors, setErrors] = useState({
    key: "",
    description: "",
    information: "",
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
    if (formData.key.trim() === "") {
      newErrors.key = "Key is required.";
    }
    if (formData.description.trim() === "") {
      newErrors.description = "Description is required.";
    }

    setErrors(newErrors);
    if (Object.values(newErrors).every((error) => error === "")) {
     const data = {
       key: formData.key,
       description: formData.description,
       information: formData.information,
     };

     fetch("http://localhost:8080/save", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(data),
     })
       .then((response) => response.json()) // Parse the JSON response
       .then((responseData) => {
         if (responseData.message) {
           // Handle the response message
           alert(responseData.message);
         } else {
           alert("Error: Something went wrong.");
         }
       })
       .catch((error) => {
         console.error("Error:", error);
         alert(error);
       });
    }
  };

  return (
    <div className="usermanagementContainer">
      <nav className="navbar">
        <div className="navbar-left">
          <img className="logo" src={Logo} alt="User Icon" />
        </div>
        <div className="navbar-right">
          <Link to="/" className="navbar-button">
            Logout
          </Link>
        </div>
      </nav>
      <h2>Save Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <input
            id="usermanagementInputs"
            type="text"
            name="key"
            placeholder="key"
            value={formData.key}
            onChange={handleChange}
          />
        </div>{" "}
        {errors.key && <div className="error">{errors.key}</div>}
        <div className="inputContainer">
          <input
            id="usermanagementInputs"
            type="text"
            name="description"
            placeholder="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>{" "}
        {errors.description && (
          <div className="error">{errors.description}</div>
        )}
        <div className="inputContainer">
          <input
            id="usermanagementInputs"
            type="text"
            name="information"
            placeholder="More infor..."
            value={formData.information}
            onChange={handleChange}
          />
        </div>
        {errors.information && (
          <div className="error">{errors.information}</div>
        )}
        <input type="submit" value="Save" />
      </form>
    </div>
  );
};

export default Admin;
