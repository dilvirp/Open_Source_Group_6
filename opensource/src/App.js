import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import BookDetails from "./components/BookDetails";
import Settings from "./components/Settings";
import Profile from "./components/Profile";
import AddBook from "./components/AddBook";
import Chat from "./components/Chat";
import Location from "./components/Location";
import Search from "./components/Search";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [location.pathname]);

  const hideNavbarOnPages = ["/login", "/signup"];
  const showNavbar = !hideNavbarOnPages.includes(location.pathname);

  return (
    <>
      {showNavbar && <NavBar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/location" element={<Location />} />
        <Route
          path="/settings"
          element={token ? <Settings /> : <Navigate to="/login" />}
        />
        <Route
          path="/home"
          element={token ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={token ? <Navigate to="/home" /> : <Navigate to="/login" />}
        />
        <Route
          path="/book/:id"
          element={token ? <BookDetails /> : <Navigate to="/login" />}
        />

        <Route
          path="/profile"
          element={token ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/add-book"
          element={token ? <AddBook /> : <Navigate to="/login" />}
        />
        <Route
          path="/chat"
          element={token ? <Chat /> : <Navigate to="/login" />}
        />

        <Route
          path="/search"
          element={token ? <Search /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
