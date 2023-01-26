import styled from "styled-components";
import Navbar from "./Navigation/Navbar"
import { Link } from "react-router-dom";

const Headerdiv = styled.header`
display:flex;
align-items:center;
justify-content: space-around;
img{
  max-height:50px;
}
nav{
  align-items:center;
}
@media screen and (max-width: 700px) {
  flex-direction:column;
  h1{
    line-height:1.8rem;
    font-size:30px;
  }
}
h1 a{
  color:${({ theme }) => theme.text};
}
@media (max-width:600px){
  display:flex;
  flex-direction:row;
  padding:0.5rem;
}

`


const Header = ({theme}) => {
  return (
  <Headerdiv>
    <h1><Link to="/">Westcoast Education</Link></h1>
    <Navbar/>
  </Headerdiv>  );
}
 
export default Header;