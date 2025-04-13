import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useState, useEffect, createContext } from "react"; // Add createContext
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
import UpdateProfile from "./components/UpdateProfile";
import Search from "./components/Search";
import DisplaySettings from "./components/DisplaySettings";
import EditBook from "./components/EditBook";
import "./App.css"; // Make sure this is imported

// Create theme context
export const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState(
    sessionStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    // Apply theme to document and body
    document.documentElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
    // Store theme preference
    sessionStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Router>
        <AppContent />
      </Router>
    </ThemeContext.Provider>
  );
}

function AppContent() {
  const location = useLocation();
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
  }, [location.pathname]);

  const hideNavbarOnPages = ["/login", "/signup"];
  const showNavbar = !hideNavbarOnPages.includes(location.pathname);

  return (
    <div className="app-container">
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
          path="/display-settings"
          element={token ? <DisplaySettings /> : <Navigate to="/login" />}
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
          path="/update-profile"
          element={token ? <UpdateProfile /> : <Navigate to="/login" />}
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
        <Route
  path="/edit-book/:id"
  element={token ? <EditBook /> : <Navigate to="/login" />}
/>
      </Routes>
    </div>
  );
}

export default App;
