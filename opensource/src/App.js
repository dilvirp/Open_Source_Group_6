import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login"
import Signup from "./components/Signup"

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  return (
    <Router>
      {token && <NavBar />} 
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/" element={token ? <Navigate to="/home" /> : <Navigate to="/login" />} /> 
      </Routes>
    </Router>
  );
}

export default App;
