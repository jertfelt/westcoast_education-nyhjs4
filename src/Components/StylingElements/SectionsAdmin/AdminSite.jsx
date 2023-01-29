import styled, { css } from "styled-components";



const AdminSite = styled.section`
@media (max-width:600px){
  padding:0;
}
padding:2rem;
color: ${({ theme }) => theme.text};
h1{
  font-family: Mukta; 
  text-align:center;
  font-size:3rem;
  @media (max-width:400px){
    font-size:2rem;
  }
}
h2{
  font-size:2.2rem;
   @media (max-width:400px){
    font-size:1.8rem;
  }
}
a{
  color: ${({ theme }) => theme.link};
  &:hover, &:active, &:focus{
    color: ${({ theme }) => theme.text};
    background:${({ theme }) => theme.highlight};
    text-transform: underline;
  }
}
h3, h4 {
  
  font-size:1.5rem;
  @media (max-width:400px){
    font-size:1.2rem;
  }
}
p{
 
  font-size:1.2rem;
  @media (max-width:400px){
    font-size:1rem;
  }
}

`
export const MainContent = styled.div`
min-height:80vh;
padding:2rem;
@media (max-width: 700px){
  padding:0rem;
}
display: flex;
flex-direction:column;
align-items:center;
justify-content:center;

`


export const TwoColumns = styled.div`
font-family: Sofia Sans;
background: ${({ theme }) => theme.background};
display:flex;
flex-direction:column;
width:100%;
max-width:1000px;
padding:1rem;
justify-content:space-around;
@media (min-width:800px){
  flex-direction:row;
}


${props => 
  props.AdminForm && 
  css`
  background: ${({ theme }) => theme.highlight};
  `}
  ${props => 
    props.List && 
    css`
    margin-top:-1rem;
    background: transparent;
    `}

`

export const FormContainer = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content: space-around;
width:100%;
font-family: Sofia Sans;
max-width:1000px;
padding:1rem;
padding-bottom:1rem;
background: ${({ theme }) => theme.highlight};
color: ${({ theme }) => theme.text};
flex-wrap: wrap;
h1{
  @media(min-width: 540px){
line-height:1rem;
  }
  line-height:2.8rem;
}
h3, p{
  color: ${({ theme }) => theme.text};
}
div{
  display:flex;
  flex-direction:row;
  align-items:center; 
  gap: 1rem;
}
@media (min-width:800px){
  flex-direction: row;
}
`

export default AdminSite