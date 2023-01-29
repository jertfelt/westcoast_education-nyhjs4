import { useNavigate, Link } from "react-router-dom";
import { auth2, sendPasswordResetEmail } from "../../../firebase/initFirebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth2);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/admin");
  }, [user, loading]);
  return ( 
    <div className="reset">
    <div className="reset__container">
      <input
        type="text"
        className="reset__textBox"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail Address"
      />
      <button
        className="reset__btn"
        onClick={() => sendPasswordResetEmail(email)}
      >
        Send password reset email
      </button>
      <div>
        Don't have an account? <Link to="/register">Register</Link> now.
      </div>
    </div>
  </div>
   );
}
 
export default Reset;