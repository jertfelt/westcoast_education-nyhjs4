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
    line-height:1rem;
    font-size:30px;
  }
}
h1 a{
  color:${({ theme }) => theme.text};
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