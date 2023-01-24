import ReactDOM  from "react-dom"
import { useState, useEffect } from "react"
import { ModalDiv, Content, Overlay } from "./Modal"
import styled from "styled-components"

const Form = styled.form`
display:flex;
flex-direction: row;
align-items:center;
justify-content:center;
gap:0.5rem;
input{
padding: 8px;
font-size:1rem;
}
input[type="submit"]{
  background: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.highlight};
  border:none;
  border-radius:9px;
  text-align:center;
  cursor: pointer;
  &:hover{
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.toggleBorder};
  }
}
@media (max-width:700px){
flex-direction:column;
}
margin-bottom:1rem;
`


const ModalOverlay = (props) => {
  const [pwdFocus, setPwdFocus] = useState(false);
  const [validPassword, setValidPassword] = useState(false)

  useEffect(() => {
    if(props.inputType === "password"){
      const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
      setValidPassword(PWD_REGEX.test(props.reference.current.value));
    }
  }, [props.reference, props.inputType]);

  return (
    <ModalDiv>
    <Content>
      <Form onSubmit={props.onSubmit}>
      <label htmlFor="student"><h3>Ändra:</h3></label>
      {props.inputType !== "password" ?(<>
      <input 
      id="student"
      ref={props.reference}
      type={props.inputType}
      defaultValue={props.default}
      />
      </>):(<>
      <input 
      id="student"
      ref={props.reference}
      minLength="8"
      onFocus={() => setPwdFocus(true)}
      onBlur={() => setPwdFocus(false)}
      aria-invalid={validPassword ? "false": "true"}
      type={props.inputType}
      defaultValue={props.default}
      />
      <p>Minst 8 karaktärer. Måste innehålla både stora och små bokstäver, minst ett nummer och minst ett specialtecken. Tillåtna tecken är:{""}
      <span aria-label="exclamation mark">
            !
          </span>{" "}
          <span aria-label="at symbol">@</span>{" "}
          <span aria-label="hashtag">#</span>{" "}
          <span aria-label="dollar sign">$</span>{" "}
          <span aria-label="percent">%</span></p>
      </>) }
      <input 

      type="submit"
      value="Spara"/>
      </Form>
    
    <button onClick={props.onCLick}>Stäng</button>
    </Content>
    </ModalDiv>
  )
}

const FormModal = (props) => {
  return (
    <>
     {ReactDOM.createPortal(
      <Overlay/>,
      document.querySelector("#overlay-root")
    )}
    {ReactDOM.createPortal(
      <ModalOverlay 
      onSubmit = {props.onSubmit}
      reference = {props.reference}
      inputType = {props.inputType}
      default = {props.default}
      onCLick={props.onClick}/>,
      document.querySelector('#modal-root')
    )}
    </>
  )
}


export default FormModal