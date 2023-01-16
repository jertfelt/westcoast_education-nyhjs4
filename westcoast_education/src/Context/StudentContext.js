import { createContext } from "react";
import { useState, useEffect } from "react";


const StudentContext = createContext({
  studentLoggedIn: false,
      studentPassword: "",
      studentName: "",
      studentEmail: "",
      onLogin: () => {},
      onLogout: () => {}
})

export const StudentContextProvider = (props) => {
  const [studentName, setStudentName] = useState("")
  const [studentEmail, setStudentEmail] = useState("")
  const [studentLoggedIn, setLoggedIn] = useState(false)
  const [studentPassword, setStudentPassword] = useState("")

  useEffect(() => {
    const studentIsLoggedIn = localStorage.getItem("loggedIn");
    if(studentIsLoggedIn){
      setLoggedIn(true)
      setStudentName(localStorage.getItem("studentName"))
    } 
  }, [])

  const onLogin = (user) => {
    setStudentName(user.studentName)
    setStudentPassword(user.studentPassword)
    setStudentEmail(user.studentEmail)
    localStorage.setItem("studentLoggedIn", true)
    setLoggedIn(true)
    localStorage.setItem("studentName", user.studentName)
    localStorage.setItem("studentEmail", user.studentEmail)
    setStudentName(localStorage.getItem("studentName"))
}
const onLogout = () => {
  setLoggedIn(false)
  localStorage.removeItem("studentLoggedIn")
  localStorage.removeItem("studentName")
  localStorage.removeItem("studentEmail")
}


  return (
    <StudentContext.Provider value={{
      studentLoggedIn: studentLoggedIn,
      studentPassword: studentPassword,
      studentName: studentName,
      studentEmail: studentEmail,
      onLogin: onLogin,
      onLogout: onLogout
     }}>
      {props.children}
    </StudentContext.Provider>
  );
}
export default StudentContext