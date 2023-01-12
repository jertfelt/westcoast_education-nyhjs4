import { useState } from "react";
import styled from "styled-components";

const Section = styled.section`
min-height:90vh;`

const Intro = styled.div`
padding:2rem;
p{ max-width:60%;}`

const Form = styled.form`
padding:2rem;
display: flex;
flex-direction: column;
gap:20px;
font-size:1.4rem;
`

const LabelInput = styled.div`
display:flex;
align-items:center;
gap:10px;
max-width:330px;
input{
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
  const [buttDisabled, setButtDisabled] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const passwordHandler = (e) => {
    setPassword(e.target.value)
    if(username.length >0 && e.target.value.length > 0 ){
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
    <Form> 
      <LabelInput>
      <label htmlFor="username">Användarnamn:</label>
      <input 
      id="username"
      placeholder="Användarnamn"
      value={username}
      onChange={userNameHandler}/>
      </LabelInput>
      <LabelInput>
        <label htmlFor="password">Lösenord:</label>
        <input id="password"
        placeholder="Lösenord"
        value={password}
        onChange={passwordHandler}/>
      </LabelInput>
      <Button
      value="Logga In"
      type="button"
      disabled={buttDisabled}
      >
      </Button>
    </Form>
    
    
  </Section> );
}
 
export default Login;