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
max-width:900px;
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
h2{text-align:center;
font-size:2rem;}
padding:2rem;

@media screen and (max-width: 700px) {
  padding:1rem;}
  
`
export const Images = styled.div`
padding-top:2rem;
display:flex;
gap:1rem;
img{width: 50%;}
@media (max-width:800px){
  flex-direction:column;
  img{width: 100%;}
}
padding-bottom:2rem;
`
export const Reviews = styled.div`
display:grid;
max-width: 1200px;
margin: 0 auto;
gap: 1rem;
div{
  max-width:300px;
}
@media (min-width:800px){
  grid-template-columns: repeat(3, 1fr);
}
h3{
  color: ${({ theme }) => theme.accent};
  line-height:0;
  font-size:1.6rem;
}
padding-bottom:3rem;
padding-top: 3rem;

`
export const GoodToKnow = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
p{max-width:900px;
text-align:center;}
h2{
  text-align:left;
  line-height:1.3rem;
  @media (max-width: 700px){
    line-height:2rem;
  }
  margin-bottom:-.5rem;
}
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
  font-size:1rem;
    &:hover{
    background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.buttonText};
  }
}
.mobile{
  @media (min-width:700px){
    display:none;
  }
}
`

export const TableCourses = styled.table`
font-family: Sofia Sans;
display:flex;
flex-direction:column;
align-items:center;
border-collapse: collapse;
thead{
  font-size:1.3rem;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.buttonText};
}
th{
  width:200px;
  padding:.5rem;
}

tbody{
  background-color: ${({ theme }) => theme.highlight};
  color: ${({ theme }) => theme.text};
}
td{
  
  font-size:1rem;
  text-align:center;
  padding:.5rem;
  width:200px;
}
button{
  padding:8px;
  border:none;
  font-size:1rem;
  &:hover{
    background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.buttonText};
  }
}
@media (max-width:700px){
  display:none;
}
`

