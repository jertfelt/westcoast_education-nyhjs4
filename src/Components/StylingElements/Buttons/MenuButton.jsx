import styled from "styled-components";
const MenuButton = styled.button`
background: transparent;
border:none;
padding:8px;
color: ${({ theme }) => theme.text};
border-radius: 9px;
&:hover{
background: ${({ theme }) => theme.highlight};
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
}
font-size:1.2rem;
cursor: pointer;
border-radius: 30px;
`

export default MenuButton