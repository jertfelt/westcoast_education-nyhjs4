import styled from "styled-components";


export const FooterStyle = styled.footer`
display:flex;
align-items:center;
justify-content: space-around;
li{
  list-style:none;
  cursor:pointer;
}
font-family: Sofia Sans;
font-size:1rem;
a{
  border-radius: 30px;
border:none;
padding:8px;
  color: ${({ theme }) => theme.text};
  &:hover,&:focus{
    color: ${({ theme }) => theme.buttonText};
    background: ${({ theme }) => theme.accent};}
}
button{
  padding:8px;
  border-radius: 30px;
  border:none;
  background: transparent;
  color:${({ theme }) => theme.text};
  font-size:1rem;
  &:hover,&:focus{
    color: ${({ theme }) => theme.buttonText};
    background: ${({ theme }) => theme.accent};
}
`

