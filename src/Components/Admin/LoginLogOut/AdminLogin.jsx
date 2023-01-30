import { useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../Context/Auth.Context";
import { Container, Links, Section,  } from "./AdminStyledSections";
import { signInWithEmailAndPassword} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth2 } from "../../../firebase/initFirebase";
import { Link } from "react-router-dom";
import { FormInstructions } from "../../StylingElements/Form/Form";


const Login = () => {
  const navigate = useNavigate()
  const context = useContext(AuthContext);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState("");
  const [user] = useAuthState(auth2);


  const loginFunction= (password, email) => {
    signInWithEmailAndPassword(email, password)
    let userName = email
    context.onLogin({
      userName,
      password,
    })
    if (user) {
      navigate("/admin");
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
      <Links>
        
          Har du inget konto?  <br/>
          <Link to="/admin/register">Registrera dig nu.</Link> 
          <p>Det kostar inget att vara admin!</p>

        </Links>
    </div>
    <div className="second">
    <FormInstructions
    onSubmit={() => loginFunction(password,email)}>
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
        <input 
          className="centered"
          type="submit"
          value="Logga in"
          />
    </FormInstructions>
    <Link to="/reset">Glömt lösenord?</Link>
    </div>

          
     
    </Container>    
  
  </Section> );
}

export default Login;