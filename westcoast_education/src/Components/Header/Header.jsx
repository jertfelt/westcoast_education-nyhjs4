import styled from "styled-components";
import MainNavigation from "../Navigation/MainNavigation/MainNavigation";


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
    
  
    <MainNavigation/>
  </Headerdiv>  );
}
 
export default Header;