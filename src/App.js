import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Register from "./Components/Usermanagement/Register/Register";
import Login from "./Components/Usermanagement/Login/Login";
import Main from './Components/MainApp/Main'
import Admin from "./Components/MainApp/Admin";

const SearchApp = () =>{
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="admin" element={<Admin />} />
          <Route path="main" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default SearchApp;
