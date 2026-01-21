import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [page, setPage] = useState("login");

  return (
    <>
      {page === "login" && (
        <Login goRegister={() => setPage("register")} />
      )}

      {page === "register" && (
        <Register goLogin={() => setPage("login")} />
      )}
    </>
  );
}

export default App;
