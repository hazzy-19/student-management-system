import { useState } from "react";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Logged in");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <>
      <h3>Login</h3>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="password"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button>
          Login
        </button>
      </form>
    </>
  );
}

export default Login;