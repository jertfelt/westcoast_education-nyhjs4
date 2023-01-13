import styled from "styled-components"
import ReactDOM  from "react-dom"


const ModalDiv = styled.div`
@media (min-width: 800px){
  left: calc(50% - 20rem);
  width: 40rem;
}
background: ${({ theme }) => theme.body};
color: ${({ theme }) => theme.buttonBackground};
box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
position: fixed;
top: 30vh;
left: 10%;
width: 80%;
z-index: 100;
overflow: hidden;
button{
  background: ${({ theme }) => theme.highlight};
  color: ${({ theme }) => theme.body};
  font-size:1rem;
  padding: 6px;
  border:none;
  cursor: pointer;
  &:hover{
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.highlight};
  }
}
`

const Overlay = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100vh;
z-index: 10;
background: rgba(0, 0, 0, 0.4);
`
const Content = styled.div`
padding: 2rem;`

const ModalOverlay = (props) => {

  return (
    <ModalDiv>
    <Content>
    <h3>{props.title}</h3>
    <p>{props.message}</p>
    <button onClick={props.onCLick}>Stäng</button>
    </Content>
    </ModalDiv>
  )
}

const Modal = (props) => {
  
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
      onCLick={props.onClick}/>,
      document.querySelector('#modal-root')
    )}
    </>
  )
}


export default Modal