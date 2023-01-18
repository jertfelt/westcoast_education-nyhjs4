import styled from "styled-components";

 const Form = styled.form`
background: ${({ theme }) => theme.toggleBorder};
padding:2rem;
color: ${({ theme }) => theme.text};
h1{
  align-self:center;
  font-size:32px;
  line-height:1rem;
}
display:flex;
flex-direction:column;

gap:10px;
font-family: Sofia Sans;
`

export const FormInstructions = styled(Form)`
.instructions{
  font-size:12px;
}
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
export const FormWOInstructions = styled(Form)`
label{
  margin-bottom:-5px;
  font-weight:bold;
}
input{
  padding:4px;
}
select{
  
  padding:4px;
}
`

export default Form


