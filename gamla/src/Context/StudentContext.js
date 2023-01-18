import { createContext } from "react";
import { useState, useEffect } from "react";


const StudentContext = createContext({
      studentLoggedIn: false,
      studentPassword: "",
      studentName: "",
      studentEmail: "",
      studentCourses: [],
      studentID: "",
      onLogin: () => {},
      onLogout: () => {}
})

export const StudentContextProvider = (props) => {
  const [studentName, setStudentName] = useState("")
  const [studentEmail, setStudentEmail] = useState("")
  const [studentLoggedIn, setLoggedIn] = useState(false)
  const [studentPassword, setStudentPassword] = useState("")
  const [studentID, setStudentID] = useState("")
  const [studentCourses, setStudentCourses] = useState([])

  useEffect(() => {
    const studentIsLoggedIn = localStorage.getItem("studentLoggedIn");
    if(studentIsLoggedIn){
      setLoggedIn(true)
      setStudentName(localStorage.getItem("studentName"))
      setStudentEmail(localStorage.getItem("studentEmail"))
      setStudentCourses(localStorage.getItem("studentCourses"))
    } 
  }, [])

  const onLogin = (user) => {
    setStudentName(user.studentName)
    setStudentPassword(user.studentPassword)
    setStudentID(user.studentID)
    setStudentCourses(user.studentCourses)
    setStudentEmail(user.studentEmail)
    setLoggedIn(true)
    localStorage.setItem("studentLoggedIn", true)
    localStorage.setItem("studentID", user.studentID)
    localStorage.setItem("studentName", user.studentName)
    localStorage.setItem("studentEmail", user.studentEmail)
    setStudentName(localStorage.getItem("studentName"))
}

const onLogout = () => {
  setLoggedIn(false)
  localStorage.removeItem("studentLoggedIn")
  localStorage.removeItem("studentID")
  localStorage.removeItem("studentName")
  localStorage.removeItem("studentEmail")
}


  return (
    <StudentContext.Provider value={{
      studentLoggedIn: studentLoggedIn,
      studentPassword: studentPassword,
      studentName: studentName,
      studentEmail: studentEmail,
      studentID: studentID,
      studentCourses: studentCourses,
      onLogin: onLogin,
      onLogout: onLogout
     }}>
      {props.children}
    </StudentContext.Provider>
  );
}
export default StudentContext