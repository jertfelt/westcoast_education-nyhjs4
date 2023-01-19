import styled from "styled-components";

 const Form = styled.form`
padding:2rem;
h1{
  align-self:center;
  font-size:2rem;
  line-height:1rem;
  @media (max-width: 600px){
    line-height:1.8rem;
    font-size:1.8rem;
  }
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

  .Row{
    display:flex;
    align-items:center;
    gap:8px;
    line-height:1rem;
    @media (max-width: 600px){
      flex-direction:column;
      align-items:flex-start;
    }
  }
  input[type="submit"] {
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


