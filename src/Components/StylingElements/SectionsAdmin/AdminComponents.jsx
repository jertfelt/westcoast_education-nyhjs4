
import styled,{css} from "styled-components";

export const Section = styled.section`
min-height:80vh;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
padding-top:3rem;
padding-bottom:7rem;

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
padding:0;
margin:0;

gap:1rem;
${props => 
  props.About && 
  css`

  display:flex;
  flex-direction:column;


  `}
`

export const InfoRuta = styled.div`
background: ${({ theme }) => theme.highlight};
color: ${({ theme }) => theme.text};
max-width:50%;
padding:2rem;
display:flex;
flex-direction:column;
align-items:center;
justify-content: center;
font-family: Sofia Sans;
ul{
  list-style:none;
  padding-left:0;
}
p{
  font-size:1.3rem;
}

button{
  margin-top: 2rem;
  padding: 9px;
  border:none;
  font-size:1rem;
  border-radius:30px;
  color:${({ theme }) => theme.text};
  background: ${({ theme }) => theme.toggleBorder};
  &:hover{
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.accent};
  }
}
${props => 
  props.About && 
  css`
  background: ${({ theme }) => theme.accent};
  display:flex;
  flex-direction:column;
  text-align:center;

  `}

`
export const TwoSquares = styled.div`
display:flex;
@media(max-width: 700px){
  flex-direction:column;
}
`


//All teacher components:

export const TeacherExists = styled.div`
padding:1rem;
`

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
background: ${({ theme }) => theme.highlight};
color: ${({ theme }) => theme.text};
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
flex-direction:row;
gap: 8px;
label{
  color:${({ theme }) => theme.text};
}
margin-top:-1rem;
label{
  font-size:1rem;
}
select{
  font-size:1rem;
  appearance: none;
  -mox-appearance: none;
  -webkit-appearance: none;
  background-color: ${({ theme }) => theme.body};
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

export const HeadingWithFilterAdmin = styled.div`
display:flex;
flex-direction:column;
align-items: center;
@media (max-width:420px){
align-items:flex-start;
padding-left:2rem;
}
`


// all courses:

export const GridKurser = styled.div`
padding:1rem;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
@media (max-width: 800px){
  padding:2rem;
  display:grid;
  gap:2rem;
  grid-template-columns: repeat(2, 1fr);
}
@media(max-width: 420px){
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  gap:1rem;
}
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
  text-align:left;
}
h3{
  font-size:1.2rem;
  line-height:1.2rem;
  text-align:left;
}
a{
    color: ${({ theme }) => theme.text};
  &:hover{
    color: ${({ theme }) => theme.accent};
  }
}


${props => 
  props.notPublished && 
  css`
  display:flex; 
  align-items:flex-start;
  justify-content:flex-start;
  background: ${({ theme }) => theme.accent};
  `}

`
export const Content = styled.div`
background:  ${({ theme }) => theme.highlight};
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
  color:${({ theme }) => theme.background}
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