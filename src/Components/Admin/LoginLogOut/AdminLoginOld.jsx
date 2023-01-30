import { useState, useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../Context/Auth.Context";
import { ButtonBlack } from "../../StylingElements/Buttons/FormButton";
//Modal
import Modal from "../../ui/Modal/Modal";
import { Section, Intro, Form, LabelInput } from "./AdminStyledSections";


import { signInWithEmailAndPassword} from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";

import { auth2 } from "../../../firebase/initFirebase";
import { Link } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate()
  const context = useContext(AuthContext);
  const [buttDisabled, setButtDisabled] = useState(true);
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null)

  const [email, setEmail] = useState("");
  const [user] = useAuthState(auth2);

 
  const [showModal, setShowModal] = useState(false)
  
  const login = (e) => {
    e.preventDefault()
    if(userName === process.env.REACT_APP_ADMIN_USERNAME && password === process.env.REACT_APP_ADMIN_PASSWORD){
      navigate("/admin")
      context.onLogin({
        userName,
        password,
      })
    }
    else if (userName !== process.env.REACT_APP_ADMIN_USERNAME){
      setShowModal(true)
      setError("Du kan ha skrivit in fel användarnamn")
    }
    else if(password !== process.env.REACT_APP_ADMIN_PASSWORD){
      setShowModal(true)
      setError("Du kan ha skrivit in fel lösenord")
    }
    else if (password !== process.env.REACT_APP_ADMIN_PASSWORD && userName !== process.env.REACT_APP_ADMIN_USERNAME){
      setShowModal(true)
      setError("Både lösenord och användarnamn är fel!")
    }
    
    else{
      setShowModal(true)
      setError("Något har gått fel. Försök igen, eller kontakta administratören.")
    }
  }

  const passwordHandler = (e) => {
    setPassword(e.target.value)
    if(userName.length >0 && e.target.value.length > 0 ){
      setButtDisabled(false)
    }else{
      setButtDisabled(true)
    }
  }

  const userNameHandler = (e) => {
    setUsername(e.target.value)
    if(password.length > 0 && e.target.value.length > 0) {
      setButtDisabled(false);
    } else {
      setButtDisabled(true);
    }
  }

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
  <Section data-testid="AdminLogin">
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
          onClick={() => loginFunction(password,email)}
        >
          Logga in
        </button>
        <div>
          <Link to="/reset">Glömt lösenord</Link>
        </div>
        <div>
          Har du inget konto? 
          <Link to="/admin/register"> Registrera</Link> dig nu.
        </div>
      </div>
    </div>
    {/* <Intro>
    <h1>Välkommen</h1>
    <p>Här krävs det inloggning! För att få ett konto, kontakta din lärare eller administratören på westcoast-admin@email.com</p>
    </Intro>
    {showModal && (
      <Modal 
      title="Något gick fel!"
      message={error}
      onClick={() => setShowModal(false)} />
    )}
    <Form onSubmit={(e) =>login(e)} 
    onFocus={() => setError(null)}> 
      <LabelInput>
      <label 
      htmlFor="username">
        Användarnamn:</label>
      <input 
      type="text"
      autoComplete="off"
      id="username"
      placeholder="Användarnamn"
      value={userName}
      onChange={userNameHandler}/>
      </LabelInput>
      <LabelInput>
        <label htmlFor="password">
          Lösenord:</label>
        <input id="password"
        placeholder="********"
        value={password}
        type="password"
        onChange={passwordHandler}/>
      </LabelInput>
      <ButtonBlack
      value="Logga In"
      type="submit"
      disabled={buttDisabled}
      >
      </ButtonBlack>
    </Form> */}
  </Section> );
}

export default Login;