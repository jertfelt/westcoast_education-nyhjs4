
//styling
import styled from "styled-components";

export const Section = styled.section`
min-height:90vh;
@media (min-width: 900px){
  padding-left:4rem;
}`
export const Intro = styled.div`
h1{
  font-size:42px;
}
padding:2rem;
p{ max-width:60%;
  @media (min-width: 900px){
    max-width:500px;
  }
}
`
export const Form = styled.form`
padding:2rem;
margin-top:-2rem;
display: flex;
flex-direction: column;
gap:20px;
font-size:1.4rem;
`
export const LabelInput = styled.div`
display:flex;
align-items:center;
gap:10px;
max-width:60%;
font-family: Sofia Sans;
@media (min-width: 900px){
  max-width:500px;
}
input{
  border-color:black;
  border-radius:9px;
  padding:4px;
  font-family: Sofia Sans;
  width:100%;
}`

