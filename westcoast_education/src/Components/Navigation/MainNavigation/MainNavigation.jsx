import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";

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

const MainNavigation = ({theme}) => {
  const [dropdownShown, setDropdown] = useState(false)

  const showMenu = (e) => {
    e.preventDefault();
    if(dropdownShown !== true){setDropdown(true)
    }
    else{
      setDropdown(false)
    }
  }


  return ( 
  <div>
    <MenuButton
    onClick={showMenu}
    >Meny</MenuButton>
    {dropdownShown && (<DropDMenu data-testid="dropdown">
      <ul>
      <li><Link to="/">Start</Link></li>
      <li><Link to="/login">Logga in</Link></li>
      </ul>
      <button onClick={() => setDropdown(false)}>Stäng</button>
    </DropDMenu>)}
  </div> );}

  
 
export default MainNavigation;