import { useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/Auth.Context";

//Modal
import Modal from "../ui/Modal/Modal";

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
const Button = styled.input`
padding:4px;
color: ${({ theme }) => theme.buttonText};background: ${({ theme }) => theme.buttonBackground};
border:none;
font-family: Sofia Sans;
border-radius:29px;
max-width:100px;
&:hover, &:focus{
  color: ${({ theme }) => theme.background};
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  background: ${({ theme }) => theme.accent};
}
&:active{
  color: ${({ theme }) => theme.button};
  background: ${({ theme }) => theme.accent};
}
cursor: pointer;
font-size:1.4rem;
`

const Login = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [buttDisabled, setButtDisabled] = useState(true);
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const adminName = "Admin"
  const adminPassword = "word123"
  //if logged in, hide login page
  const [authenticated, setAuthenticated] = useState(context.loggedIn)
  //if wrong pass/username show modal
  const [showModal, setShowModal] = useState(false)
  
  const LoginFunction = (e) => {
    e.preventDefault()
    if(userName === adminName && password === adminPassword){
      navigate("/admin")
      context.onLogin({
        userName,
        password,
      })
    }
    else{
    setShowModal(true)
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
    {!authenticated ? <>
    <Intro>
    <h1>Välkommen</h1>
    <p>Här krävs det inloggning! För att få ett konto, kontakta din lärare eller administratören på westcoast-admin@email.com</p>
    </Intro>
    {showModal && (
      <Modal 
      title="Något gick fel!"
      message="Du kan ha skrivit in fel användarnamn eller lösenord."
      onClick={() => setShowModal(false)} />
    )}
    <Form onSubmit={LoginFunction}> 
      <LabelInput>
      <label htmlFor="username">Användarnamn:</label>
      <input 
      type="text"
      id="username"
      placeholder="Användarnamn"
      value={userName}
      onChange={userNameHandler}/>
      </LabelInput>
      <LabelInput>
        <label htmlFor="password">Lösenord:</label>
        <input id="password"
        placeholder="Lösenord"
        value={password}
        type="password"
        onChange={passwordHandler}/>
      </LabelInput>
      <Button
      value="Logga In"
      type="submit"
      disabled={buttDisabled}
      >
      </Button>
    </Form></>: <Intro> <h1>Välkommen</h1>
    <p>Du är redan inloggad!</p>
    <button className="btn" onClick={() => navigate(-1)}>
     Gå  tillbaka
  </button>
    </Intro>}
  </Section> );
}

export default Login;