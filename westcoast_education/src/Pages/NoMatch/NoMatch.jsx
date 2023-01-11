import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const ErrorPage = styled.section`
padding:4rem;
h1{
   color: ${({ theme }) => theme.accent};
   font-size:3rem;
   line-height:1rem;
}
p{
   max-width:60%;
}
button{
   color: ${({ theme }) => theme.buttonText};
   border:none;
   background-color: ${({ theme }) => theme.buttonBackground};
   padding: 8px;
   &:hover, &:focus{
      color: ${({ theme }) => theme.buttonBackground};
      background-color: ${({ theme }) => theme.accent};
   }
   &:active{
      color: ${({ theme }) => theme.highlight};
   }
}
`

const NoMatch = () => {
  const navigate = useNavigate();
  return (    
  <ErrorPage data-testid="NoMatch">
     <h1>Oops!</h1>
     <p>Något blev fel. Kontakta webb-administratören om problemet kvarstår, eller prova att gå tillbaka till föregående sida.</p>

  <button className="btn" onClick={() => navigate(-1)}>
     Gå  tillbaka
  </button>
</ErrorPage>  );
}
 
export default NoMatch;