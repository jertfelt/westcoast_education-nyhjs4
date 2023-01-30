import styled from "styled-components";
import { useEffect, useState, useRef, useContext, } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../Context/Auth.Context";
import StudentContext from "../../../Context/StudentContext";
import MenuButton from "../../StylingElements/Buttons/MenuButton";


const DropDMenu = styled.nav`
  background: ${({ theme }) => theme.highlight};
  color: ${({ theme }) => theme.text};
  font-size:1.2rem;
  position: absolute;
  top: 10vh;
  left:10%;
  min-width:200px;
  max-width:400px;
  z-index: 100;
  overflow: hidden;
  padding: 12px 16px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  @media (min-width: 768px) {
      left: calc(60%);
      width: 20rem;
  }
  

button{
  background: transparent;
  color: ${({ theme }) => theme.text};
  border:none;
  padding:8px;
  font-size:1.2rem;
  position:relative;
  left:80%;
  &:hover{
    color: ${({ theme }) => theme.body};
  }
}
ul{
  list-style:none;
  display:flex; 
  flex-direction:column;
  gap:8px;
  align-items:flex-start;
}
li{
  &:hover{
    font-weight:bolder;
  }
}
a{
  color:${({ theme }) => theme.text};
  font-family: Sofia Sans;
  &:hover{
    color: ${({ theme }) => theme.buttonText};
  }
  &:focus{
    color: ${({ theme }) => theme.body};
  }
  &:active{
    color: ${({ theme }) => theme.text};
  }
}
`

 const Navbar = () => {
  const ref = useRef()
  const context = useContext(AuthContext)
  const contextStudent = useContext(StudentContext)
  const [dropdownShown, setDropdown] = useState(false)
  
  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (dropdownShown && ref.current && !ref.current.contains(e.target)) {
        setDropdown(false)
      }
    }

    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        if (dropdownShown && ref.current){
          setDropdown(false)
        }
     }
   };

    document.addEventListener("mousedown", checkIfClickedOutside)
    document.addEventListener("keydown", handleEsc)

    return() => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
      document.removeEventListener("keydown", handleEsc)
    }
  },[dropdownShown])


  return ( 
  <div ref={ref}>
    
    <MenuButton
    onClick={() => setDropdown(prev => !prev)}>
      Meny</MenuButton>
      {dropdownShown && (
      <DropDMenu data-testid="dropdown">
      <ul>
      <li><Link to="/">Start</Link></li>
      <li><Link to="/student">Studentportal</Link></li>
      {!context.loggedIn && <li><Link to="/admin/login">Admin</Link></li>}
      {context.loggedIn && <>
      <li><Link to="/admin">Admin</Link></li>
      <li><Link onClick={context.onLogout}>Logga ut</Link></li>
      </>
      } 
      {!context.loggedIn && <> 
      {contextStudent.studentLoggedIn && <li><Link onClick={contextStudent.onLogout}>Logga ut</Link></li> }
      </>}
      </ul>
      <button onClick={() => setDropdown(false)}>Stäng</button>
    </DropDMenu>)}
  </div> );}

  
export default Navbar