
import styled,{css} from "styled-components";

export const Section = styled.section`
min-height:80vh;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
padding-bottom:3rem;
@media (max-width: 700px){
  padding:1rem;
  padding-bottom:3rem;
}
h1{
  font-size:2rem;
}
`



export const ButtonContainer = styled.div`
display:flex;
flex-direction:row;
align-items:center;
justify-content:center;

@media (max-width:700px){
  flex-direction:column;
}
gap:1rem;

`

export const InfoRuta = styled.div`
background: ${({ theme }) => theme.background};
color: ${({ theme }) => theme.buttonText};
max-width:1000px;
padding:1rem;
display:flex;
flex-direction:column;
align-items:center;
justify-content: center;

ul{
  list-style:none;
}
p{
  font-size:1rem;
}
margin-bottom:-2rem;
button{
  padding: 4px 19px;
  border:none;
  font-size:14px;
  border-radius:30px;
  color:${({ theme }) => theme.text};
  background: ${({ theme }) => theme.toggleBorder};
  &:hover{
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.background};
  }
}
`

//All teacher components:

export const Grid = styled.div`
display: grid;
gap: 3rem;
margin: 0 auto;
max-width:800px;
@media (min-width: 600px){
  grid-template-columns: repeat(2,1fr);
}
padding-top: 2rem;
padding-bottom:3rem;
`
export const GridTeacher = styled.div`
margin: -1rem;
display:flex;
flex-wrap:wrap;
padding:1rem;
flex-direction: column;
align-items: center;
justify-content:center;
max-width:400px;
background-color: ${({ theme }) => theme.buttonBackground};
color: ${({ theme }) => theme.buttonText};
width:100%;
text-align:center;

p{
  margin-bottom:2rem;
}
a{
  background:${({ theme }) => theme.background};
  padding: 6px;
  border-radius:9px;
}

${props => 
  props.competences && 
  css`
  display:flex;
  flex-wrap:wrap;
  flex-direction: column;
  align-items: center;
  justify-content:flex-start;
  padding:1rem;
  margin: 0;
  

  p,h3{
    max-width:100%;
    margin-bottom:0;
    text-align:center;
  }
 
  .center_one_item{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    padding:0;
  }
  .one_item{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    padding:0;
  }
  `}
`
export const Row = styled.div`
display:flex;
align-items: center;
justify-content:center;
gap:1rem;
@media (max-width: 700px){
display:flex;
flex-direction:column;
}
`
export const HeadingWFilter = styled.div`
display:flex;
align-items: center;
justify-content:center;
flex-direction:column;
gap:0.5rem;
margin-bottom:1rem;
h2{
  line-height:2rem;
}
` 

export const AllTeachersContent = styled.div`
display:flex;
flex-direction: column;
background: ${({ theme }) => theme.background};
color: ${({ theme }) => theme.buttonText};
`
export const List = styled.ul`
text-align:left;
list-style:none;
display:grid;
padding:0;
@media (min-width: 600px){
  grid-template-columns: repeat(2,1fr);
}
max-width:200px;
gap:5px;
margin-left:-5px;
.filtered{
  color: ${({ theme }) => theme.highlight};
  font-weight:bold;
}
`

export const Filter= styled.div`
display:flex;
align-items: center;
gap: 8px;
label{
  color:${({ theme }) => theme.highlight};
}
margin-top:-1rem;
list-style:none;
@media (max-width: 700px){
  flex-direction:column;
}

`


// all courses:

export const GridKurser = styled.div`
`

export const Courses = styled.div`
display:flex; 
align-items:flex-start;
justify-content:flex-start;
opacity:0.8;

&:hover{
  opacity:1;
}
p{
  font-size:1rem;
  line-height:1.2rem;
}
h3{
  font-size:1.2rem;
  line-height:1.2rem;
}
a{
  &:hover{
    color: ${({ theme }) => theme.accent};
  }
}

`
export const Content = styled.div`
background:  ${({ theme }) => theme.background};
h2{
text-align: flex-start;
line-height:2rem;
}
`

export const KursDetails = styled.div`
color: ${({ theme }) => theme.text}
max-width:800px;
display:flex;
flex-direction: column;
p{max-width: 60%;}
align-items:center;
justify-content:center;
text-align:center;
flex-wrap:wrap;
strong{
  color:${({ theme }) => theme.body}
}

.Row{
  display:flex; 
  gap:1rem;
  @media (max-width: 700px){
    flex-direction:column;
  }
 
} 
padding-bottom: 3rem;

`

export const PublishBtn = styled.button`
cursor: pointer;
:disabled{
  cursor:none;
  background:transparent;
  color: ${({ theme }) => theme.toggleBorder}
}
background:${({ theme }) => theme.toggleBorder}
color: ${({ theme }) => theme.buttonText};
margin-bottom:-1rem;
margin-top:-1rem;


`