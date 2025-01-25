import "./"

function Signup() {
    return (
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form>
          <div>
            <label>Username</label>
            <input type="text" name="username" placeholder="Enter your username" />
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" placeholder="Enter your email" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" placeholder="Enter your password" />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
  
  export default Signup;
  