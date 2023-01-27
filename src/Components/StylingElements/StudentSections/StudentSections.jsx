import styled, {css} from "styled-components";

const Studentsections = styled.section`
display:flex;
flex-direction:column;
justify-content:center;
align-items: center;
padding:1rem;
min-height:80vh;

`

export const ButtonDiv = styled.div`
display:flex;
flex-direction:row;
align-items:flex-end;
max-width:300px;
margin-top:1rem;
button{
  font-size:1rem;
}
justify-content:space-between;
@media (max-width:700px){
  flex-direction:column;
}`

export const StudentContainer = styled.div`
background: ${({ theme }) => theme.buttonText};
color: ${({ theme }) => theme.background};



padding:2rem;
display:flex;
flex-direction:column;
align-items: center;
gap:1rem;
max-width:800px;
width:100%;
border-radius:9px;
@media (max-width: 800px){
padding:0rem;
gap:0;
  padding-bottom:2rem;
  div{
    width:100%;
  }
}
`

export const ColumnTwo = styled.div`
height:100%;
background: ${({ theme }) => theme.background};
color: ${({ theme }) => theme.link};
padding: 1rem;
display:flex;
flex-direction: column;
align-items:center;
justify-content:center;
border-radius:29px;
max-width:30%;
h2{
  text-align:center;
  line-height:1rem;
}
h3{
  line-height:1rem;
}
div{
  display:flex;
  flex-direction:column;
  align-items:center;
  text-align:center;
  h4{font-size:1.2rem;
  margin-bottom:-.5rem;}
  h3{
    margin-bottom:-.5rem;
  }
}
@media (max-width: 800px){
  max-width:80%;
  div{
    width:100%;
    padding:1rem;
  }
}
`

export const TwoColumns = styled.div`
display:flex;
flex-direction:row;
align-items:center;
gap: 1rem;
@media (max-width: 800px){
  display:flex;
  flex-direction:column;
  align-items:center;
}
${props => 
  props.largergap && 
  css`
  justify-content:space-around;
  gap:3rem;
  text-align:end;
  p{font-size:1rem;}
  @media (max-width: 800px){
    display:flex;
    flex-direction:column;
    width:100%;
  }
  `}

`
 

export const Introduction = styled.div`
margin: 0 auto;
padding:0;
h1{
  text-align:center;
  font-size:2rem;
}
font-family: Sofia Sans;
h3{
  font-size:1.5rem;
  color: ${({ theme }) => theme.background};
}
`


export const QuestionDiv = styled.div`
margin-top:2rem;
display:flex;
gap:20px;
flex-direction:column;
align-items: center;
justify-content: flex-end;
background: ${({ theme }) => theme.accent};
border-radius:30px;
color: ${({ theme }) => theme.body};
padding: 1rem;
p{
  font-size:2rem;
  text-align:center;
}

button{
  margin-top:-1rem;
  padding:6px;
  color: ${({ theme }) => theme.text};
  background:${({ theme }) => theme.body};
  border:none;
  font-weight:bold;
  &:hover{
    color: ${({ theme }) => theme.body};
    background:${({ theme }) => theme.text};
  }
}
`
export const Content = styled.div`
min-height:80vh;
padding:2rem;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
max-width:800px;
` 
export const ContentLoginRegister = styled.div`
min-height:50vh;
background:${({ theme }) => theme.background};
color: ${({ theme }) => theme.accent};
font-size:1.2rem;
padding:2rem;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
max-width:800px;
h1{
  font-size:2.5rem;
  color:${({ theme }) => theme.toggleBorder};
}
@media (min-width:800px){
flex-direction:row;
gap:3rem;
}
button{
  background: ${({ theme }) => theme.toggleBorder};
  &:hover{
    background: ${({ theme }) => theme.highlight};
    color: ${({ theme }) => theme.text};
    }
    &:active, &:focus{
      background: ${({ theme }) => theme.accent};
      color: ${({ theme }) => theme.background};
    }
    cursor: pointer;
   font-size:1rem;
   border-radius:30px;
   max-width:50%;
}
` 


export const ProfileSection = styled.section`
padding:3rem;
min-height:80vh;

color: ${({ theme }) => theme.text};
display:flex;
gap:2rem;
flex-direction:column;
align-items: center;
justify-content:center;
@media (min-width: 800px){
  flex-direction:row;
}
h1{
  font-size:48px;
}
a{
  font-size:20px;
  color: ${({ theme }) => theme.accent};
  &:acive{
    color: ${({ theme }) => theme.accent};
  }
  &:focus{
    color: ${({ theme }) => theme.accent};
  }
  &:hover{
    color: ${({ theme }) => theme.text};
  }
}
img{
  max-width:300px;
  border-radius: 50%;
}
 .logoutBtn{
  border-radius:9px;
  font-size:1rem;
  border:none;
  padding: 8px;
  background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.body};
  &:hover{
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.body};
  }
}
.logoutBtn{
  margin-top:1rem;
}
.Row-reverse{
  display:flex;
  flex-direction:row-reverse;
  gap:3rem;
  align-items:center;
  margin-bottom:-2rem;
}

form{
  margin-top:1rem;
  display:flex; 
  gap: 5px;
  align-items:center;
  flex-direction:column;
  @media (min-width:768px){
    flex-direction:row;
  }
  input{
    padding: 4px;
    font-size:1rem;
  }
  input[type=submit]{
    border:none;
    padding: 4px 6px;
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.body};
    &:active{
      background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    }
    &:focus{
      background: ${({ theme }) => theme.accent};
      color: ${({ theme }) => theme.highlight};
    }
    &:hover{
      background: ${({ theme }) => theme.body};
      color: ${({ theme }) => theme.text};
    }
  }
}
`

export const ParagraphWithButton = styled.div`

  display:flex;
  gap:2rem;
  align-items:center;
  button{
    font-size:1rem;
  }
 
`

export const StudentPortalInfo = styled.div`
display:flex;
flex-direction:column;
gap:1px;
max-width:400px;
font-size:20px;
p{line-height:1.2rem;}
form{
  font-family: Sofia Sans;
  font-size:20px;
  margin-top:1rem;
  display:flex; 
  gap: 5px;
  align-items:center;
  flex-direction:column;
  @media (min-width:768px){
    flex-direction:row;
  }
  input{
    font-size:18px;
    padding: 4px;
  }
  input[type=submit], button{
    border:none;
    border-radius:9px;
    padding: 8px;
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.body};
    &:active{
      background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    }
    &:focus{
      background: ${({ theme }) => theme.accent};
      color: ${({ theme }) => theme.highlight};
    }
    &:hover{
      background: ${({ theme }) => theme.body};
      color: ${({ theme }) => theme.text};
    }
  }
}
input[type=submit], button{
  border:none;
  border-radius:9px;
  padding: 8px;
  background: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.body};
  &:active{
    background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  }
  &:focus{
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.highlight};
  }
  &:hover{
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }
}
`

export const IfAlreadyExists = styled.div`
display:flex;
flex-direction:row;
justify-content:space-around;
align-items:center;
text-align:left;

h3{
  padding-right:2rem;
}
div{

  p{
    font-size:1.2rem;
  }
}
.exists{
h3{
  padding-right:2rem;
}
display:flex;
flex-direction:row;
justify-content:space-around;
align-items:center;
text-align:left;
@media (max-width:800px){
  h3{
    margin-top:-.5rem;
    font-size:2rem;
    padding:0;
    margin-bottom:-.5rem;
  }
  flex-direction:column;
  
  p,h3{
    text-align:center;
  }
}
}
 
`

export default Studentsections