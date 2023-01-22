import styled from "styled-components";



const AdminSite = styled.section`
padding:2rem;
h1{
  font-family: Mukta; 
  text-align:center;
  font-size:3rem;
  color: ${({ theme }) => theme.text};
}
h2{
  font-size:2.2rem;
}
a{
  color: ${({ theme }) => theme.highlight};
  &:hover{
    color: ${({ theme }) => theme.accent};
  }
  &:active, &:focus{
    color: ${({ theme }) => theme.link};
    text-transform: underline;
  }
}
h3, h4 {
  color: ${({ theme }) => theme.link};
  font-size:1.5rem;
}
p{
  color: ${({ theme }) => theme.link};
  font-size:1.2rem;
}
`
export const MainContent = styled.div`
display: flex;
flex-direction:column;
align-items:center;
justify-content:center;
background: `

export const TwoColumns = styled.div`
font-family: Sofia Sans;
background: ${({ theme }) => theme.background};
display:flex;
flex-direction:column;
width:100%;
max-width:1000px;
padding:1rem;
justify-content:space-around;
h2{
  color: ${({ theme }) => theme.buttonText};
}
@media (min-width:800px){
  flex-direction:row;
}
`

export const FormContainer = styled.aside`
display:flex;
flex-direction:column;
align-items:center;
justify-content: space-around;
width:100%;
font-family: Sofia Sans;
max-width:1000px;
padding:1rem;
background: ${({ theme }) => theme.highlight};
color: ${({ theme }) => theme.text};
h3, p{
  color: ${({ theme }) => theme.text};
}
div{
  display:flex;
  flex-direction:row;
  align-items:center; 
  gap: 1rem;
  @media (max-width:700px){
    flex-direction:column;
  }
}
@media (min-width:800px){
  flex-direction: row;
}
`

export default AdminSite