import React, { useState, useEffect } from "react";
import {  Link } from "react-router-dom";
import "../../App.css";
import SearchIcon from '../../icons/search-icon.png'
import RecordIcon from '../../icons/mic.png'
import Logo from "../../icons/logo.png";
import { useLocation } from "react-router-dom";
const Main = () => {
  const location = useLocation();
  const logedUser = location.state.logedUser;
  const [isAdmin, setIsAdmin] = useState(false);
  const [query, setQuery] = useState("");
  const [res, setres] = useState("");
  const [speechSynthesis, setSpeechSynthesis] = useState(null);
  const [speach, setSpeach] = useState("");
  const [showSpeachResults, setShowSpeachResults] = useState(false);
  const [showSearchResults, setSearchResults] = useState(false);

  useEffect(() => {
    if (logedUser.role === "Admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    const synthesis = window.speechSynthesis;
    setSpeechSynthesis(synthesis);
  }, []);

  const search = (key) => {
    fetch(`http://localhost:8080/getDef/${key}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        data.key !== "Nothing!!"
          ? setSearchResults(true)
          : setSearchResults(false);
        setres(data.description);
        speakResults(query);
        setQuery('')
      })
      .catch((error) => {});
  };

  useEffect(() => {
    const synthesis = window.speechSynthesis;
    setSpeechSynthesis(synthesis);
  }, []);

  const speakResults = () => {
    let results = "From the search you have made we got " + res;
    if (res === "") {
      const utterance = new SpeechSynthesisUtterance(
        "you did not search anything"
      );
      speechSynthesis.speak(utterance);
    } else {
      const utterance = new SpeechSynthesisUtterance(results);
      speechSynthesis.speak(utterance);
    }
  };

  const speachRecorder = () => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.start();
      recognition.onresult = (event) => {
        const speech = event.results[0][0].transcript;
        setSpeach(speech);
        setres(speach);
        search(speach);
      };
    } else {
      console.log("Speech recognition not supported in this browser.");
    }
  };

  useEffect(() => {
    search(speach);
    speach !== "" ? setShowSpeachResults(true) : setShowSpeachResults(false);
  }, [speach]);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
          <img className="logo" src={Logo} alt="User Icon" />
        </div>
        <div className="navbar-right">
          {isAdmin && (
            <Link to="/admin" className="navbar-button">
              Save Info
            </Link>
          )}
          <Link to="/" className="navbar-button">
            Logout
          </Link>
        </div>
      </nav>
      <h1>TalkToDiscover App</h1>
      <div className="searcBox">
        <img
          id="search-button"
          src={RecordIcon}
          alt="Search Icon"
          onClick={() => speachRecorder()}
        />
        <input
          id="search-input"
          type="text"
          placeholder="Enter what you wanna search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <img
          id="search-button"
          src={SearchIcon}
          alt="Search Icon"
          onClick={() => search(query)}
        />
      </div>

      <input
        id="read-results"
        type="button"
        value="Read Results"
        onClick={() => speakResults()}
      />
    </div>
  );
};

export default Main;
