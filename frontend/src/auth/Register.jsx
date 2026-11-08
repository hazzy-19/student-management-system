import { useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Account created");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <>
      <h3 className="text-center">Sign Up</h3>

      <form
        onSubmit={handleRegister}
        className="p-4"
      >
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>
          Create Account
        </button>
      </form>
    </>
  );
}

export default Register;