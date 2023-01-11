import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const TeachersContext = createContext();

const CoursesContext = createContext();

export const APICoursesContextProvider = ({children}) => {
  const [courses, setCourses] = useState([])
  useEffect(() => {
    fetch('http://localhost:8000/courses')
    .then((response) => response.json())
    .then((data) => setCourses(data));
  },[])
  return(
    <CoursesContext.Provider 
    value={{courses}}>
      {children}
    </CoursesContext.Provider>
  )
}

export const APITeachersContextProvider = ({children}) => {
  const [teachers, setTeachers] = useState([])
  useEffect(() => {
    fetch('http://localhost:8000/teachers')
    .then((response) => response.json())
    .then((data) => setTeachers(data));
  },[])
  return(
    <TeachersContext.Provider 
    value={{teachers}}>
      {children}
    </TeachersContext.Provider>
  )
}

// export const useTeacher = () => {
//   const context = useContext(TeachersContext)
//   if(context === undefined){
//     throw new Error("Context must be used within a Provider");
//   }
//   return context;
// }

// export const useCourses = () => {
//   const context = useContext(CoursesContext)
//   if(context === undefined){
//     throw new Error("Context must be used within a Provider");
//   }
//   return context;
// }