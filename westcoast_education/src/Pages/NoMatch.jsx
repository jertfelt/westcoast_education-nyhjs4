import { useNavigate } from "react-router-dom";

const NoMatch = () => {
  const navigate = useNavigate();
  return (    
  <div className="NoMatch">

     <h1>Tyvärr blev det fel</h1>

  <button className="btn" onClick={() => navigate(-1)}>
     Gå  tillbaka
  </button>
</div>  );
}
 
export default NoMatch;