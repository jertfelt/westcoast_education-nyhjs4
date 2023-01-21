import styled from "styled-components";

const Studentsections = styled.section`

display:flex;
flex-direction:content;
justify-content:center;
align-items: center;
`



export const QuestionDiv = styled.div`
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

export default Studentsections