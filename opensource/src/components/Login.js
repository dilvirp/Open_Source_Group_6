import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/Login.css";
function Login() {
  
  const [formData, setFormData] = useState({ emailAddress: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();


  //  Handle input changes 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });  
  }

  // Handle form  submissions 
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5189/api/auth/login", {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/Home");
        
      } else {
        setError(data.message || "Invalid Email or password");
      }
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p style= {{color: "red"}}>{error}</p>}
      <form onSubmit={submitForm}>
        <div>
          <label>Email Address</label><input type="text" name="emailAddress" placeholder= "Enter in your email address "value={formData.emailAddress} onChange={handleChange}></input></div>

        <div>
          <label>Password</label><input type="password" name="password" placeholder="Enter in your password" value={formData.password} onChange={handleChange}></input>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
