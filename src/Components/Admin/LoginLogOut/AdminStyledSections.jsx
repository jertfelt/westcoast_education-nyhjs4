
//styling
import styled from "styled-components";

export const Section = styled.section`
min-height:90vh;
display: flex;
flex-direction:column;
align-items:center;
justify-content:center;
padding:5rem;

@media (max-width:700px){
  padding:1rem;
}
`
export const Container = styled.div`
max-width:1000px;
min-height: 30vh;
padding:3rem;
background: ${({ theme }) => theme.background};
h1, h2, label, p{
  color: ${({ theme }) => theme.link}
}
h1{
  font-size:3rem;
}
text-align:center;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
input{
  border-color: ${({ theme }) => theme.highlight}
  padding:4px;
  font-weight:bold;
}
a{
  color: ${({ theme }) => theme.link};
  font-weight:bold;
  padding: 8px 4px;
  margin-top:.5rem;
  &:active, &:hover, &:focus{
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    border-radius: 9px;
  }
}
`

export const Links = styled.div`
padding: 3rem;
font-family: Sofia Sans;
display:flex;
flex-direction: column;
gap:4px;
background: ${({ theme }) => theme.highlight};
margin-top: 2rem;
margin-bottom:2rem;
border-radius: 29px;
font-size:1.5rem;
a{
  color: ${({ theme }) => theme.link};
  font-weight:bold;
  padding: 0px 4px ;
  &:active, &:hover, &:focus{
    background: ${({ theme }) => theme.background};
    border-radius: 9px;
  }
}

`