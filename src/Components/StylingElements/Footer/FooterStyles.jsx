import styled from "styled-components";


export const FooterStyle = styled.footer`
display:flex;
align-items:center;
padding:1rem;
justify-content: space-around;
li{
  list-style:none;
  cursor:pointer;
  font-size:1.2rem;
}
font-family: Sofia Sans;

a{
  font-size:1.2rem;
  border-radius: 30px;
border:none;
padding:8px;
  color: ${({ theme }) => theme.text};
  &:hover,&:focus{
    background: ${({ theme }) => theme.highlight};
  }
}
button{
  font-size:1.2rem;
  padding:8px;
  border-radius: 30px;
  border:none;
  background: transparent;
  color:${({ theme }) => theme.text};
  
  &:hover,&:focus{
    background: ${({ theme }) => theme.highlight};
}
`

