import styled from "styled-components";
import { useEffect, useState, useRef, useContext, } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../store/auth-context";

const MenuButton = styled.button`
background: transparent;
border:none;
padding:8px;
color: ${({ theme }) => theme.text};
border-radius: 9px;
&:hover{
  background: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.body};
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
}
font-size:1rem;
cursor: pointer;
border-radius: 30px;
`
const DropDMenu = styled.nav`
  background: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.body};
  font-size:1rem;
  position: absolute;
  top: 10vh;
  left:30%;
  min-width:200px;
  max-width:400px;
  z-index: 100;
  overflow: hidden;
  padding: 12px 16px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  @media (min-width: 768px) {
      left: calc(50% - 20rem);
      width: 50rem;
  }

button{
  background: transparent;
  color: ${({ theme }) => theme.body};
  border:none;
  padding:8px;
  position:relative;
  left:80%;
  &:hover{
    color: ${({ theme }) => theme.accent};
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
  color:${({ theme }) => theme.buttonText};
  font-family: Sofia Sans;
  &:hover{
    color: ${({ theme }) => theme.accent};
  }
  &:focus{
    color: ${({ theme }) => theme.accent};
  }
  &:active{
    color: ${({ theme }) => theme.accent};
  }
}
`

const MainNavigation = () => {
  const ref = useRef()
  const context = useContext(AuthContext)
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
      {!context.isLoggedIn && <li><Link to="/login">Logga in</Link></li>}
      {context.isLoggedIn && <>
      <li><Link to="/admin">Admin</Link></li>
      <li><button onClick={context.onLogout}>Logga ut</button></li>
      </>
      }
      </ul>
      <button onClick={() => setDropdown(false)}>Stäng</button>
    </DropDMenu>)}
  </div> );}

  
 
export default MainNavigation;