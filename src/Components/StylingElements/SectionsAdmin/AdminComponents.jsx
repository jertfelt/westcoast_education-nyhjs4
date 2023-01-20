
import styled from "styled-components";

export const Section = styled.section`
display: flex;
align-items:center;
flex-direction:column;
justify-content:center;
padding:10rem;
@media (max-width: 700px){
  padding:0;
}
`

export const ButtonContainer = styled.div`
display:flex;
align-items:center;
@media (max-width:700px){
  flex-direction:column;
}
gap:1rem;`

export const InfoRuta = styled.div`
box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
background: ${({ theme }) => theme.background};
color: ${({ theme }) => theme.buttonText};
max-width:500px;
padding:3rem;
padding-top:1rem;
ul{
  list-style:none;
}
p{
  font-size:1rem;
}
margin-bottom:-2rem;



button{
  padding: 4px 8px;
border:none;
font-size:14px;
border-radius:30px;
margin-top:1rem;
&:hover{
  background: ${({ theme }) => theme.toggleBorder};
color: ${({ theme }) => theme.accent};
}
}
`