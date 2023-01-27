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

export const GobackButton = styled.button`
padding:8px;
color: ${({ theme }) => theme.toggleBorder}
background: ${({ theme }) => theme.buttonText};background: ${({ theme }) => theme.highlight};
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
font-size:1rem;
`