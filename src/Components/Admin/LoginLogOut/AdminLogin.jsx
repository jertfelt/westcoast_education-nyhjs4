import { useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../Context/Auth.Context";
import { Container,Section,  } from "./AdminStyledSections";
import { signInWithEmailAndPassword} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth2, logInWithEmailAndPassword } from "../../../firebase/initFirebase";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import RegisterOrLoginContainer from "./RegisterOrLoginContainer";


const Login = () => {
  const navigate = useNavigate()
  const context = useContext(AuthContext);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("")
  const auth = getAuth();
  const user2 = auth.currentUser;

  const loginFunction= (password, email) => {
    logInWithEmailAndPassword(email, password)
    setUserName(email)
    if (user2) {
      console.log(user2, "loggedin")
      navigate("/admin");
      context.onLogin({
        userName,
        password,
      })
    }
    else {
      console.log("user not logged in")
    }
  }
  return ( 
  <Section 
  data-testid="AdminLogin">
    <Container>
    <div>
      <h1>Logga in som admin</h1>
      <h2>Nyheter:</h2>
      <p>Just nu är det några buggar kvar. <br/>Rapportera gärna till webbadminstratören om du märker av dessa.</p>
      
    </div>
    <div className="second">
    <div>
      <div className="Row">
        <label htmlFor="adminEmail">Email:</label>
        <input
          id="adminEmail"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
      </div>
      <div className="Row">
        <label htmlFor="adminPassword">Lösenord:</label>
        <input
          id="adminPassword"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="******"
        />
      </div>
        <button
          className="centered"
          onClick={() => loginFunction(password,email)}
          >
          Logga in
          </button>
    </div>
    <Link to="/reset">Glömt lösenord?</Link>
    </div>
    
    </Container>    
    <RegisterOrLoginContainer></RegisterOrLoginContainer>
  </Section> );
}

export default Login;