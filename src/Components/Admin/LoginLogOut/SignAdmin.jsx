import { Section } from "./AdminStyledSections";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate} from "react-router-dom";
import { auth2,  registerWithEmailAndPassword } from "../../../firebase/initFirebase";
import {useState } from "react";
import AuthContext from "../../../Context/Auth.Context";
import { useContext } from "react";

const SignAdmin = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate()
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user,] = useAuthState(auth2);
  const context = useContext(AuthContext);


  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password)
    let userName = email
    context.onLogin({
      userName,
      password,
    })
    if (user) {
      navigate("/admin");
    }
  };

  return ( <Section data-testid="AdminRegister">
<div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="register__btn" 
        onClick={register}>
          Register
        </button>
        
        <div>
          Already have an account? <Link to="/admin/login">Login</Link> now.
        </div>
      </div>
    </div>

  </Section> );
}
 
export default SignAdmin;