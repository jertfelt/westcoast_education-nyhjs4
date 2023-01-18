import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword} from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";

import {auth} from "./fireBase"

function LoginTest() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
    <p>Laddar...</p>
      return;
    }
    if (user) navigate("/studentportal");
  }, [user, loading]);

  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => signInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        {/* <div>
          <Link to="/reset">Forgot Password</Link>
        </div> */}
        <div>
          Don't have an account? <Link to="/registerstudent">Register</Link> now.
        </div>
      </div>
    </div>
  );
}
export default LoginTest;