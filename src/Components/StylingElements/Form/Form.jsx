import styled, { css } from "styled-components";

const Form = styled.form`
padding:2rem;
h1{
  padding-top:1rem;
  font-size:2rem;
  line-height:1rem;
  @media (max-width: 600px){
    line-height:1.8rem;
  }
  text-align:center;
}
display:flex;
flex-direction:column;
gap:20px;
font-family: Sofia Sans;
p{
  font-size:1.2rem;
}
@media (max-width: 700px){
  padding:0px;
  gap:0;
  align-items:center;
  width:100%;
  min-width:300px;
  max-width:600px;
}
`

export const FormInstructions = styled(Form)`
padding-bottom:0;
font-family: Sofia Sans;
width:100%;

h3,h2{
  font-size:2rem;
  @media (max-width:800px){
    font-size:1.5rem;
  }
}
h4{
  font-size:1.5rem;
  @media (max-width: 500px){
    font-size:1.2rem;
  }
}

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
  font-size:1rem;
  max-width:400px;
  color: ${({ theme }) => theme.link};
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
    flex-direction:row;
    align-items:center;
    justify-content: flex-end;
    gap:1rem;
    line-height:1rem;
    @media (max-width: 600px){
      flex-direction:column;
    }

  }
  input{
    padding: 6px;
    border-radius: 9px;
    width:100%;
    max-width:400px;
    font-size:1.2rem;
  }
  input[type="date"]{
    max-width:50%;
    font-family: Sofia Sans;
    padding: 6px;
    border-radius: 9px;
  }
  textarea{
    padding: 6px;
    border-radius: 9px;
    font-family: Sofia Sans;
    max-width:400px;
    width:100%;
    font-size:1.2rem;
  }
  label{
    font-size:1.5rem;
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
    border:none;
    border-radius:30px;
    margin-top:2rem;
     background: ${({ theme }) => theme.body};
     color: ${({ theme }) => theme.text};
      &:hover{
      background: ${({ theme }) => theme.accent};
      color: ${({ theme }) => theme.text};
      }
    cursor: pointer;
    max-width:50%;
    font-family: Sofia Sans;
    text-align:center;
    :disabled{
      display:none;
    }
  }
  @media (max-width: 700px){
    max-width:50%;
  }
  .centered{
    align-self:center;
  }
  ${props => 
    props.twoColumns && 
    css`
    display:flex;
    flex-direction:row;
    justify-content:space-around;
    text-align:end;
    p{font-size:1rem;}
    `}

    ${props => 
      props.studentCourses && 
      css`
      background: ${({ theme }) => theme.highlight};
      border-radius: 29px;
      max-width:60%;
      display:flex;
      flex-direction:column;
      align-items:center;
      padding:1rem;
      padding-bottom:2rem;
      justify-content:center;
      .disabled{
        display:none;
      }
      .enabled{
        align-self:center;
        opacity: 1;
        cursor:pointer;
      }

      input[type="submit"] {
        padding: 6px 8px;
        color: ${({ theme }) => theme.link};
        background: ${({ theme }) => theme.background};
        border:none;
        border-radius:30px;
          &:hover{
            color: ${({ theme }) => theme.link};
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            background: ${({ theme }) => theme.background};
          }
        cursor: pointer;
        max-width:30%;
        font-family: Sofia Sans;
        text-align:center;
        :disabled{
          display:none;
        }
      }

      .selecting{
        display:flex;
        flex-direction:column;
        label{
          text-align:center;
          background: ${({ theme }) => theme.background};
          padding:10px;
          color: ${({ theme }) => theme.link};
        }
        select{
          border-color: ${({ theme }) => theme.background};
          padding: 10px;
          color: ${({ theme }) => theme.background};
          font-size: 1rem;
         
          text-align:center;
        }
      }
      
      @media (max-width: 800px){
        width:100%;
        background:transparent;
      `}
    }
    ${props => 
      props.Kursform && 
      css`
      font-family: Sofia Sans;
      max-width:80%;
      label{color: ${({ theme }) => theme.background};
      line-height:1.5rem;}
      input{
        padding: 4px;
      }
      .number{
        max-width:20%;
      }
      `}
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
      background: ${({ theme }) => theme.toggleBorder};
      color: ${({ theme }) => theme.accent};
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


