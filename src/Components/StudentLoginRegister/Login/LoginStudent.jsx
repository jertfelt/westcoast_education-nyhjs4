import {useState} from "react";
import RegisterStudent from "../RegisterStudent"
import LoginFormStudent from "./LoginFormStudent"

import LoginTest from "./LoginStudentTest";
import Register from "./RegisterNewStudent";


import styled from "styled-components";
const QuestionDiv = styled.div`
display:flex;
gap:20px;
align-items: center;
justify-content: flex-end;
background: ${({ theme }) => theme.highlight};
border-radius:30px;
color: ${({ theme }) => theme.body};
padding: 1rem;
padding-right:1rem;
margin-top:2rem;
button{
  padding:6px;
  height:50%;
  color: ${({ theme }) => theme.text};
  background:${({ theme }) => theme.body};
  
  border:none;
  font-weight:bold;
  &:hover{
    color: ${({ theme }) => theme.body};
    background:${({ theme }) => theme.text};
  }
}
`
const Content = styled.div`
min-height:80vh;
padding:2rem;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
width:100%;` 

const LoginStudent = () => {
  const [notMemberYet, setMember] = useState(false)
 
const determineMember = () => {
  if(!notMemberYet){
    setMember(true) 
  }
  else{
    setMember(false)
  }
}

  return (
  <section>
  <Content>
  
  {/* {!notMemberYet && <Register/>}  */}
     {notMemberYet && <LoginTest/>}
    {/* {!notMemberYet && <RegisterStudent/>}
    {notMemberYet && <LoginFormStudent/>} */}
    <QuestionDiv>
      {!notMemberYet && <p data-testid="initialQuestion">Är du redan registrerad?</p>}
      {notMemberYet && <p data-testid="ifNotMember">Behöver du registrera dig?</p>}
      <button 
    onClick={determineMember}>Klicka här</button>
    </QuestionDiv>
    </Content>
  </section>  );
}
 
export default LoginStudent;