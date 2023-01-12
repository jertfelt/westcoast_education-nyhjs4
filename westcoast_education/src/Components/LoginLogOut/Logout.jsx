import { useNavigate } from "react-router-dom"


export const LogOut = () => {
  const navigate = useNavigate()
  const logOut = () => {
 
    navigate("/")
  }
  
  return (
    <button onClick={logOut}>Logga ut</button>
    );
}
 