import { useState } from "react";
import "./auth.css";

function Login({ goRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password required");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("Login successful");

    // ✅ Fields clear after success
    setEmail("");
    setPassword("");
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <label>Password</label>
        <div className="password-box">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <span
            className="eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            👁
          </span>
        </div>

        <button type="submit">Login</button>
      </form>

      <p className="switch-text">
        New user?{" "}
        <button
          type="button"
          onClick={() => {
            setError("");
            setSuccess("");
            goRegister();
          }}
        >
          Register
        </button>
      </p>
    </div>
  );
}

export default Login;
