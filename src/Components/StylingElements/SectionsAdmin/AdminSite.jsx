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
  color: ${({ theme }) => theme.text};
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
gap: 8px;
label{
  color:${({ theme }) => theme.text};
  font-size:1rem;
}
margin-top:-1rem;

select{
  font-size:1rem;
  appearance: none;
  -mox-appearance: none;
  -webkit-appearance: none;
  background-color: ${({ theme }) => theme.toogleBorder};
  border: thin solid blue;
  border-radius: 4px;
  display: inline-block;

  line-height: 1.5em;
  padding: 0.5em 3.5em 0.5em 1em;
  
  &:hover{
    background-color: ${({ theme }) => theme.highlight};
    border-color: ${({ theme }) => theme.highlight};
  }

  background-image:
    linear-gradient(45deg, transparent 50%, ${({ theme }) => theme.background} 50%),
    linear-gradient(135deg, ${({ theme }) => theme.background} 50%, transparent 50%),
    radial-gradient(${({ theme }) => theme.highlight} 70%, transparent 72%);
  background-position:
  
    calc(100% - 20px) calc(1rem + 2px),
    calc(100% - 15px) calc(1rem + 2px),
    calc(100% - .5em) .5em;
  background-size:
    5px 5px,
    5px 5px,
    1.5em 1.5em;
  background-repeat: no-repeat;

:focus{
    background-image:
    linear-gradient(45deg, white 50%, transparent 50%),
    linear-gradient(135deg, transparent 50%, white 50%),
    radial-gradient(gray 70%, transparent 72%);
  background-position:
    calc(100% - 15px) 1em,
    calc(100% - 20px) 1em,
    calc(100% - .5em) .5em;
  background-size:
    5px 5px,
    5px 5px,
    1.5em 1.5em;
  background-repeat: no-repeat;
  border-color: green;
  outline: 0;
}
}
`

export default AdminSite