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

@media (max-width: 700px){
  padding:0px;
}
`

export const FormInstructions = styled(Form)`
font-family: Sofia Sans;
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
    cursor: pointer;
    @media (max-width: 700px){
      padding:1px;
    }
}
.smallBtn {
  @media (max-width: 700px){
    width:50%;
  }
  width:30%;
}
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
  input{
    width:100%;
    border-color:${({ theme }) => theme.accent};
  }
  label{
    font-weight:bold;
    color: ${({ theme }) => theme.text};
  }

  input[type="submit"] {
    @media (max-width: 700px){
      width:50%;
    }
    padding: 6px 8px;
    background: ${({ theme }) => theme.toggleBorder};
    border:none;
    border-radius:30px;
    margin-top:1rem;
      &:hover{
      background: ${({ theme }) => theme.accent};
      color: ${({ theme }) => theme.toggleBorder};
      }
    cursor: pointer;
    max-width:50%;
    text-transform:uppercase;
    font-family: Sofia Sans;
    font-weight:bold;
    text-align:center;
  }
  .centered{
    align-self:center;
  }
  

`

export const ButtonContainerOutsideForm = styled.div`
padding:2rem;
display:flex;
flex-direction:column;
gap:10px;
font-family: Sofia Sans;
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
    cursor: pointer;
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


