import { useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../Context/Auth.Context";
import { ButtonBlack } from "../../StylingElements/Buttons/FormButton";
//Modal
import Modal from "../../ui/Modal/Modal";

//styling
import styled from "styled-components";
const Section = styled.section`
min-height:90vh;
@media (min-width: 900px){
  padding-left:4rem;
}`
const Intro = styled.div`
h1{
  font-size:42px;
}
padding:2rem;
p{ max-width:60%;
  @media (min-width: 900px){
    max-width:500px;
  }
}
`
const Form = styled.form`
padding:2rem;
margin-top:-2rem;
display: flex;
flex-direction: column;
gap:20px;
font-size:1.4rem;
`
const LabelInput = styled.div`
display:flex;
align-items:center;
gap:10px;
max-width:60%;
@media (min-width: 900px){
  max-width:500px;
}
input{
  border-color:black;
  border-radius:9px;
  padding:4px;
  font-family: Sofia Sans;
  width:100%;
}`



const Login = () => {
  const navigate = useNavigate()
  const context = useContext(AuthContext);
  const [buttDisabled, setButtDisabled] = useState(true);
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null)
 
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

  return ( 
  <Section data-testid="Login">
    <Intro>
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
    </Form>
  </Section> );
}

export default Login;