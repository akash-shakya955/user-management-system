import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (email === "" || password === "") {
      setError("Email and password required");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("Login successful");

    console.log("Email:", email);
    console.log("Password:", password);

    setEmail("");
    setPassword("");
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        {/* Email */}
        <div>
          <label htmlFor="email">Email</label><br />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password with Eye */}
        <div>
          <label htmlFor="password">Password</label><br />

          <div style={{ position: "relative", width: "250px" }}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", paddingRight: "30px" }}
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                userSelect: "none"
              }}
            >
              👁
            </span>
          </div>
        </div>

        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
