import { useNavigate } from "react-router-dom"
import { getAuth, signOut } from "firebase/auth"
import { useContext } from "react"
import AuthContext from "../../../Context/Auth.Context"

const LogOut = () => {
  const navigate = useNavigate()
  const auth= getAuth()
  const context = useContext(AuthContext)
  const logOut = () => {
    context.onLogout()
    signOut(auth).then(() => {
      navigate("/")
      window.location.reload()
    })
  }
  return (
    <button onClick={logOut}>Logga ut</button>
    );
}

export default LogOut