import styled, {css} from "styled-components";

const Studentsections = styled.section`
display:flex;
flex-direction:column;
justify-content:center;
align-items: center;
padding:1rem;
min-height:80vh;
`

export const StudentContainer = styled.div`
background: ${({ theme }) => theme.background};
color: ${({ theme }) => theme.body};

label{
  color:${({ theme }) => theme.toggleBorder};
}
padding:1rem;
.disabled{
  display:none;
}
.enabled{
  align-self:center;
  opacity: 1;
  cursor:pointer;
}

`

export const TwoColumns = styled.div`
display:flex;
flex-direction:row;
gap: 1rem;
${props => 
  props.largergap && 
  css`
  justify-content:space-around;
  text-align:end;
  p{font-size:1rem;}
   `}
`
 


export const QuestionDiv = styled.div`
margin-top:1rem;
display:flex;
gap:20px;
flex-direction:column;
align-items: center;
justify-content: flex-end;
background: ${({ theme }) => theme.accent};
border-radius:30px;
color: ${({ theme }) => theme.body};
padding: 1rem;


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
background:${({ theme }) => theme.text};
color: ${({ theme }) => theme.accent};
padding:2rem;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
max-width:800px;
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
  font-size:14px;
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
button{
  font-size:14px;
  border:none;
  padding:4px 6px;
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
margin-top:-2rem;
  display:flex;
  gap:10px;
  align-items:center;

.offscreen{
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
`

export const IfAlreadyExists = styled.div`
h2{
  text-align:center;
}
padding-bottom:2rem;
`

export default Studentsections