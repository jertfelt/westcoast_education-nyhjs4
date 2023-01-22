
import styled,{css} from "styled-components";

export const Section = styled.section`
display: flex;
align-items:center;
flex-direction:column;
justify-content:center;
padding:10rem;
@media (max-width: 700px){
  padding:1rem;
  padding-bottom:3rem;
}
`

export const ButtonContainer = styled.div`
display:flex;
align-items:center;
@media (max-width:700px){
  flex-direction:column;
}
gap:1rem;`

export const InfoRuta = styled.div`

background: ${({ theme }) => theme.background};
color: ${({ theme }) => theme.buttonText};
max-width:100%;
padding:1rem;

ul{
  list-style:none;
}
p{
  font-size:1rem;
}
margin-bottom:-2rem;
button{
  padding: 4px 8px;
border:none;
font-size:14px;
border-radius:30px;
margin-top:1rem;
&:hover{
  background: ${({ theme }) => theme.toggleBorder};
color: ${({ theme }) => theme.accent};
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
list-style:none;
@media (max-width: 700px){
  flex-direction:column;
}

`