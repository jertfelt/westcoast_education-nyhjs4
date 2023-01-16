import { useNavigate } from "react-router-dom"


const LogOut = () => {
  const navigate = useNavigate()
  const logOut = () => {
    navigate("/")
    window.location.reload()
  }
  
  return (
    <button onClick={logOut}>Logga ut</button>
    );
}

export default LogOut