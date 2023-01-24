import { createContext } from "react";
import { useState, useEffect } from "react";

const StudentContext = createContext({
      studentLoggedIn: false,
      studentName: "",
      studentEmail: "",
      studentID: "",
      studentCourseFirstChoice: "",
      studentCourseSecondChoice: "",
      onLogin: () => {},
      onLogout: () => {},
      onAddingCourses: () => {}
})

export const StudentContextProvider = (props) => {
  const [studentName, setStudentName] = useState("")
  const [studentEmail, setStudentEmail] = useState("")
  const [studentLoggedIn, setLoggedIn] = useState(false)
  const [studentPassword, setStudentPassword] = useState("")
  const [studentID, setStudentID] = useState("")
  const [studentCourseFirstChoice, setCourse1] = useState("")
  const [studentCourseSecondChoice, setCourse2] = useState("")
  
  
  useEffect(() => {
    const studentIsLoggedIn = localStorage.getItem("studentLoggedIn");
    if(studentIsLoggedIn){
      setLoggedIn(true)
      setStudentName(localStorage.getItem("studentName"))
      setStudentEmail(localStorage.getItem("studentEmail"))
      setStudentID(localStorage.getItem("studentID"))
      setCourse1(localStorage.getItem("studentCourseFirstChoice"))
      setCourse2(localStorage.getItem("studentCourseSecondChoice"))
    } 
  }, [])

  const onLogin = (user) => {
    setStudentName(user.studentName)
    setStudentPassword(user.studentPassword)
    setStudentID(user.studentID)
    setStudentEmail(user.studentEmail)
    setLoggedIn(true)
    setCourse1(user.studentCourseFirstChoice)
    setCourse2(user.studentCourseSecondChoice)
    localStorage.setItem("studentCourseFirstChoice", user.studentCourseFirstChoice)
    localStorage.setItem("studentCourseSecondChoice", user.studentCourseSecondChoice)
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
  localStorage.removeItem("studentCourseFirstChoice")
  localStorage.removeItem("studentCourseSecondChoice")
}

const onAddingCourses = (user) => {
  setCourse1(user.studentCourseFirstChoice)
  setCourse2(user.studentCourseSecondChoice)
  localStorage.setItem("studentCourseFirstChoice", user.studentCourseFirstChoice)
  localStorage.setItem("studentCourseSecondChoice", user.studentCourseSecondChoice)
}


  return (
    <StudentContext.Provider value={{
      studentLoggedIn: studentLoggedIn,
      studentPassword: studentPassword,
      studentName: studentName,
      studentEmail: studentEmail,
      studentID: studentID,
      studentCourseFirstChoice: studentCourseFirstChoice,
      studentCourseSecondChoice: studentCourseSecondChoice,
      onLogin: onLogin,
      onLogout: onLogout,
      onAddingCourses: onAddingCourses,
     }}>
      {props.children}
    </StudentContext.Provider>
  );
}
export default StudentContext