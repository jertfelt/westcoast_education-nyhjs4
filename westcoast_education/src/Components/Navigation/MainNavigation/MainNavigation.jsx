import styled from "styled-components";
import { useState } from "react";
import DropDownMenu from "../../ui/Modal/DropDownMenu";

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
  <nav>
    <MenuButton
    onClick={showMenu}
    >Meny</MenuButton>

    {dropdownShown && (<DropDownMenu
    theme={theme} 
    onClick={() => setDropdown(false)}
    data-testid="dropdown-menu"
    />)
      }
   
  </nav> );}

  
 
export default MainNavigation;