import StudentContext from "../../Context/StudentContext";

import { useContext, useState, useRef, useEffect } from "react";
import RegisterStudent from "./RegisterStudent";
import LoginFormStudent from "./LoginFormStudent";

import styled from "styled-components";


const Form = styled.form`
display:flex;
flex-direction:column;
max-width:600px;
gap:4px;
input{
  padding:4px;
}
.instructions{
  font-size:12px;
}
.offscreen{
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
`

const LoginStudent = () => {
  const context = useContext(StudentContext);
 
  const [showModal, setShowModal] = useState(false)
  const [errMsg, setErrMsg] = useState("")


  
  const [notMemberYet, setMember] = useState(false)
  const [revealQuestion1, setReveal1] = useState(true)
  const [revealQuestion2, setReveal2] = useState(false)


const determineMember = () => {
  if(!notMemberYet){
    setMember(true)
    setReveal1(false)
    setReveal2(true)
  }
  else{
    setMember(false)
    setReveal1(true)
    setReveal2(false)
  }
}

  return (
  <aside>
    {revealQuestion1 && <div>
      <p>Är du redan registrerad?</p>
    <button 
    onClick={determineMember}>Klicka här</button>
    </div>}
    {!notMemberYet && <>
      <RegisterStudent/>
      {revealQuestion2 && <div>
    <p>Är du redan registrerad?</p>
    <button 
    onClick={determineMember}>Klicka här</button>
    </div>}
    </>
    }
    {notMemberYet && <><LoginFormStudent/>
    <p>Behöver du registrera dig?</p>
    <button 
    onClick={determineMember}>Klicka här</button>
    </>
    }
    
  </aside>  );
}
 
export default LoginStudent;