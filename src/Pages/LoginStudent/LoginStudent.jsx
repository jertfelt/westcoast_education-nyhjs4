import {useState} from "react";
import RegisterStudent from "../../Components/StudentLoginRegister/Register/RegisterNewStudent";
import LoginFormStudent from "../../Components/StudentLoginRegister/Login/LoginFormStudent"
import Studentsections, {QuestionDiv, ContentLoginRegister} from "../../Components/StylingElements/StudentSections/StudentSections";


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
  <Studentsections>
  <ContentLoginRegister>
    {!notMemberYet && <RegisterStudent/>}
    {notMemberYet && <LoginFormStudent/>}
    <QuestionDiv>
      {!notMemberYet && <p data-testid="initialQuestion">
        Är du redan registrerad?</p>}
      {notMemberYet && <p data-testid="ifNotMember">
        Behöver du registrera dig?</p>}
      <button 
    onClick={determineMember}>Klicka här</button>
    </QuestionDiv>
    </ContentLoginRegister>
  </Studentsections>  );
}
 
export default LoginStudent;