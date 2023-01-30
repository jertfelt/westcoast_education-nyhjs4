import { Container, Links, Section } from "./AdminStyledSections";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate} from "react-router-dom";
import { auth2,  registerWithEmailAndPassword } from "../../../firebase/initFirebase";
import {useState } from "react";
import AuthContext from "../../../Context/Auth.Context";
import { useContext } from "react";
import { FormInstructions } from "../../StylingElements/Form/Form";

const SignAdmin = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate()
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user,] = useAuthState(auth2);
  const context = useContext(AuthContext);


  const register = () => {
    if (!name) alert("Vänligen fyll i alla fält");
    registerWithEmailAndPassword(name, email, password)
    let userName = email
    if (user) {
      context.onLogin({
        userName,
        password,
      })
      navigate("/admin");
      
    }
  };

  return ( 
  <Section data-testid="AdminRegister">
    <Container>
      <div>
        <h1>Registrera dig</h1>
        <p>Som admin kan du ändra och lägga till kurser och lärare.</p>
        <Links>
        Har du redan ett konto?  
        <Link to="/admin/login">Logga in här.</Link>
      </Links>
      </div>
      <div className="second">
        <FormInstructions
        onSubmit= {register}>
          <div className="Row">
            <label htmlFor="adminNamn">Namn: </label>
          <input
          id="adminNamn"
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ditt namn"
        />
          </div>
          <div className="Row">
            <label htmlFor="newAdminEmail">Email: </label>
          <input
          id="newAdminEmail"
          type="email"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
          </div>
          <div className="Row">
          <label htmlFor="newAdminPass">Lösenord:</label>
          <input
          id="newAdminPass"
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="******"
        />
          </div>
          <input type="submit"
          onClick={(e) => (e.preventDefault)}
          value="Registrera"/>
        </FormInstructions>
      </div>
    </Container>


  </Section> );
}
 
export default SignAdmin;