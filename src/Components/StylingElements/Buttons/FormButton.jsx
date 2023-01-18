import styled from "styled-components";

const Button = styled.input`
border-radius: 30px;
width:100px;
margin-top:1rem;
padding:1rem;
border:none;
font-family: Sofia Sans;
align-self:center;
font-weight:bold;
font-size:14px;
opacity: 0.8;
.enabled{
  opacity: 1;
  cursor:pointer;
}
`
export default Button

export  const ButtonBlack = styled.input`
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