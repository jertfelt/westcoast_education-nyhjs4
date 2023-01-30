
//styling
import styled from "styled-components";

export const Section = styled.section`
min-height:90vh;
display: flex;
flex-direction:column;
align-items:center;
justify-content:center;
padding:5rem;

@media (max-width:700px){
  padding:1rem;
}
`
export const Container = styled.div`
border-radius: 30px;
max-width:1000px;
min-height: 30vh;
padding:3rem;
background: ${({ theme }) => theme.background};
background: linear-gradient(330deg, ${({ theme }) => theme.buttonBackground} 0%,  ${({ theme }) => theme.highlight} 100%);

h1, h2, label, p{
  color: ${({ theme }) => theme.link}
}
h1{
  font-size:3rem;
}
text-align:center;
display:flex;
flex-direction:row;
@media (max-width:700px){
  flex-direction:column;
}
align-items:center;
justify-content:center;
input{
  border-color: ${({ theme }) => theme.highlight}
  padding:4px;
}
a{
  color: ${({ theme }) => theme.link};
  font-weight:bold;
  padding: 10px 4px;
  margin-top:.5rem;
  &:active, &:hover, &:focus{
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    border-radius: 9px;
  }
}
div{
  display:flex;
  flex-direction: column;
  align-items:center;
  width:80%;
  padding:2rem;
}
.second{
  form{
    display:flex;
    flex-direction: column;
    align-items:center;

    gap: 0px;
    div{
      padding:0.5rem;
    }
  }
}
`

export const Links = styled.div`
padding: 3rem;
font-family: Sofia Sans;
display:flex;
flex-direction: column;
gap:4px;
background: ${({ theme }) => theme.body};
margin-top: 2rem;
margin-bottom:2rem;
border-radius: 29px;
font-size:1.5rem;
p{
  color: ${({ theme }) => theme.text};
}
a{
  color: ${({ theme }) => theme.highlight};
  font-weight:bold;
  padding: 3px 8px ;
  &:active, &:hover, &:focus{
    color: ${({ theme }) => theme.link};
    background: ${({ theme }) => theme.background};
    border-radius: 9px;
  }
}

`