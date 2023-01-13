import { useState, useEffect } from "react";
import { createContext } from "react";

const AuthContext = createContext({
  loggedIn: false,
  userPassword: "",
  userName: "",
  onLogin: () => {},
  onLogout: () => {}
})


export const AuthContextProvider = (props) => {
  const [userName, setUserName] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  const [userPassword, setUserPassword] = useState("")


  useEffect(() => {
    const userIsLoggedIn = localStorage.getItem("loggedIn");
    if(userIsLoggedIn === "1"){
      setLoggedIn(true)
      setUserName(localStorage.getItem("userName"))
    } 
  }, [])

  const onLogin = (user) => {
      setUserName(user.userName)
      setUserPassword(user.userPassword)
      localStorage.setItem("loggedIn", 1)
      setLoggedIn(true)
      localStorage.setItem("userName", user.userName)
      setUserName(localStorage.getItem("userName"))
  }

  const onLogout = () => {
    setLoggedIn(false)
    localStorage.removeItem("loggedIn")
    localStorage.removeItem("userName")
  }

  return (
    <AuthContext.Provider value={{
      loggedIn: loggedIn,
      userPassword: userPassword,
      userName: userName,
      onLogin: onLogin,
      onLogout: onLogout
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext