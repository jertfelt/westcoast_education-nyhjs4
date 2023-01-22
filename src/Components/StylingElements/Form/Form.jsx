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
padding-bottom:0;
font-family: Sofia Sans;

button{
  padding: 4px 8px;
    border:none;
    font-size:14px;
    border-radius:30px;
    margin-top:1rem;
    &:hover{
    background: ${({ theme }) => theme.toggleBorder};
    color: ${({ theme }) => theme.background};
    }
    &:active, &:focus{
      background: ${({ theme }) => theme.accent};
      color: ${({ theme }) => theme.background};
    }
    cursor: pointer;
    @media (max-width: 700px){
      padding:1px;
    }

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
.Kompetenser{
  display:flex;
  flex-direction:column;
  align-items: center;
}
  .Row{
    display:flex;
    align-items:center;
    gap:1rem;
    line-height:1rem;
    @media (max-width: 600px){
      flex-direction:column;
      align-items:flex-start;
    }
  }
  input{
    width:100%;
    max-width:400px;
  }
  textarea{
    font-family: Sofia Sans;
    max-width:400px;
    width:100%;
  }
  label{
    max-width:50%;
    color: ${({ theme }) => theme.buttonText};
  }
  .number{
    max-width:70%;
    :invalid{
      border: 3px solid red;
    }
  }

  input[type="submit"] {
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
    max-width:20%;
    text-transform:uppercase;
    font-family: Sofia Sans;
    text-align:center;
  }
  @media (max-width: 700px){
    max-width:50%;
  }
  .centered{
    align-self:center;
  }
`

export const ButtonContainerOutsideForm = styled.div`
width:100%;
max-width:600px;
font-family: Sofia Sans;
padding:1rem;
padding-top:0;
display:flex;
flex-direction:column;
gap:10px;
align-items:center;
justify-content:center;

button{
  background: ${({ theme }) => theme.toggleBorder};
  cursor: pointer;
  padding: 4px 8px;
    border:none;
    font-size:14px;
    border-radius:30px;
    margin-top:1rem;
    &:hover{
      background: ${({ theme }) => theme.accent};
      color: ${({ theme }) => theme.toggleBorder};
      }
}

.onlyone{
  button {
      max-width:50%;
  }
}

.text {
  padding: 2px;
  background:transparent;
  text-align:left;
  color: ${({ theme }) => theme.toggleBorder};
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


