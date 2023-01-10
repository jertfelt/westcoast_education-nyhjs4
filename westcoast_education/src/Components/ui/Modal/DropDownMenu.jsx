import styled from "styled-components";
import ReactDOM  from "react-dom";

const DropDMenu = styled.div`
background: ${({ theme }) => theme.buttonBackground};
color: ${({ theme }) => theme.body};
font-size:1rem;
position: absolute;
top: 10vh;
left:30%;
min-width:200px;
max-width:400px;
z-index: 100;
overflow: hidden;
padding: 12px 16px;
box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
@media (min-width: 768px) {
    left: calc(50% - 20rem);
    width: 50rem;
}

button{
  background: transparent;
  color: ${({ theme }) => theme.body};
  border:none;
  padding:8px;
  position:relative;
  left:80%;
  &:hover{
    color: ${({ theme }) => theme.accent};
  }
}
ul{
  list-style:none;
  display:flex; 
  flex-direction:column;
  gap:6px;
  align-items:flex-start;
}
li{
  a{
    font-family: Sofia Sans;
  }
  &:active{
    color: pink;
  }
  &:hover{
    color: ${({ theme }) => theme.accent};
    font-weight:bolder;
  }
  &:focus{
    color: ${({ theme }) => theme.accent};
  }
}
`

const OverlayDiv = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100vh;
z-index: 10;
background: rgba(0, 0, 0, 0.4);
`



const Overlay = () => {
  return <OverlayDiv/>
}

const DropDownOverlay = (props) => {
 
  return(
    <DropDMenu data-testid="dropdown">
    <ul>
        <li>Start</li>
        <li>Alla kurser</li>
        <li>Våra lärare</li>
        <li>Logga in</li>
    </ul>
      <button onClick={props.onClick}>Stäng</button>
   
  </DropDMenu>
  )
}

const DropDownMenu = (props) => {
  return (
    <div>
    {ReactDOM.createPortal(
      <Overlay/>,
      document.querySelector("#overlay-root")
    )}

    {ReactDOM.createPortal(
      <DropDownOverlay
      onClick={props.onClick}
      />,
      document.querySelector("#modal-root")
    )}
    </div>
   );
}
 
export default DropDownMenu;