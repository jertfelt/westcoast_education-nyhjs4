import ReactDOM  from "react-dom"
import { ModalDiv, Content, Overlay } from "./Modal"
import styled from "styled-components"
const ButtonContainer = styled.div`
display:flex;
gap:1rem;
`
const ModalOverlay = (props) => {

  return (
    <ModalDiv>
    <Content>
    <h3>{props.title}</h3>
    <p>{props.message}</p>
    <ButtonContainer>
    <button onClick={props.onClickYes}>Jag är säker</button>
    <button onClick={props.onCLick}>Stäng</button>
    </ButtonContainer>
    </Content>
    </ModalDiv>
  )
}

const ValidationModal = (props) => {
  return (
    <>
     {ReactDOM.createPortal(
      <Overlay/>,
      document.querySelector("#overlay-root")
    )}
    {ReactDOM.createPortal(
      <ModalOverlay 
      title={props.title}
      message={props.message}
      onClickYes={props.onClickYes}
      onCLick={props.onClick}/>,
      document.querySelector('#modal-root')
    )}
    </>
  )
}


export default ValidationModal