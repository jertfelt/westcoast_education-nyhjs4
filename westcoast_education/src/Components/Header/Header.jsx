import styled from "styled-components";

import  Navbar  from "../Navigation/Navbar";


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
`


const Header = ({theme}) => {
  return (
  <Headerdiv>
    <h1>Westcoast Education</h1>
    <Navbar/>
  </Headerdiv>  );
}
 
export default Header;