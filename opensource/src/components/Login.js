import '../components/Login.css'

function Login(){

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form>
                <div>
                    <label>Username</label>
                    <input type="text" name="username" placeholder="Enter in your name"></input>
                </div>

                <div>
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Enter in your password"></input>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;