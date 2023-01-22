import styled from "styled-components";

export const Intro = styled.div`
min-height:50vh;
color: ${({ theme }) => theme.text};
padding:2rem;
display:flex;
flex-direction:column;
align-items:center;
img{
  max-width:100%;
}
@media screen and (max-width: 700px) {
  padding:1rem;}
h1{
  font-size:2em;
  @media screen and (max-width: 992px) {
    line-height:2rem;
  }
}
h3{
  color: ${({ theme }) => theme.accent};
}
`
export const TwoColumns = styled.div`
display:flex;
flex-direction: row;
gap: 2rem;
margin-top:1rem;
@media screen and (max-width: 700px) {
flex-direction:column;
gap:0.3rem;}
`

export const Column = styled.div`
max-width:50%;

@media screen and (max-width: 700px) {
  max-width:80%;}
`


export const About = styled.div`
padding:2rem;
@media screen and (max-width: 700px) {
  padding:1rem;}
`

export const Grid = styled.div`
display:grid;
max-width: 1200px;
margin: 0 auto;
gap: 1rem;
div{
  background: ${({ theme }) => theme.background};
  padding:2rem;
  color: ${({ theme }) => theme.buttonText};
  a{
    color:${({ theme }) => theme.buttonText};
    padding-right:6px;
  }
  h3{
    font-size:30px;
    margin-top:1rem;
  }
  p{
    max-width:80%;
  }
}
@media (min-width:800px){
  grid-template-columns: repeat(2, 1fr);
}
button{
  padding:8px;
  border:none;
}
`