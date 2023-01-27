import { Fragment, useState } from "react";

//*----styling & darkmode/lightmode:
import Theme, { lightTheme, darkTheme }  from "./Components/styling/Theme";
import GlobalStyle from "./Components/styling/globalStyles"
import { useDarkMode } from "./Components/ThemeModes/useDarkMode";
import { ThemeProvider } from "styled-components";

//*toggler darkmode/lightmode
import Toggle from "./Components/ThemeModes/Toggler";

//*---routing
import {BrowserRouter} from "react-router-dom";
import Routing from "./Config/Routes"

//*---other components
import Header from "./Components/Header/Header";
import {LineMain } from "./Components/StylingElements/Line/Line";
import {FooterStyle as Footer} from "./Components/StylingElements/Footer/FooterStyles"
import LinksInFooter from "./Components/FooterLinks/LinksInFooter";

import { GetDb } from "./firebase/getDb";
import { useEffect } from "react";
import initFirebase from "./firebase/initFirebase";
import { child, get, getDatabase, ref } from "firebase/database";
import { FirebaseContext } from "./firebase/firebase_context";
import { useFirebase } from "./Components/utils/useFirebase";


function App() {
  const [allCourses, setAllCourses] = useState("")
  const [allStudents, setAllStudents] = useState("")
  const [allTeachers, setAllTeachers] = useState("")
  const [allCompetences, setComeptences] = useState("")
  
 
  
 const {courses, students, teachers, competences, error, loading} = GetDb("/courses", "/students", "teachers", "/competences")

 console.log(courses, "testar use")
  // GetDb("/courses", 
  // "/students", 
  // "/teachers", 
  // "/competences")
  // .then((data) => {
  //   console.log(data.courses, "d3")
  //   if(data.courses){
  //     setAllCourses(data.courses)
  //   }
  //   if(data.teachers){
  //     setAllTeachers(data.teachers)
  //   }
  //   if(data.competences){
  //     setComeptences(data.competences)
  //   }
  //   if(data.students){
  //     setAllStudents(data.students)
  //   }
  //   if(data.error){
  //     setError(data.error)
  //   }
  // })

  


  //*theme:
  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  if(!mountedComponent) return <div/>
 
  return (
    <FirebaseContext.Provider value={initFirebase}>
      <Data db={"/courses"}/>
    <Fragment>
    <Theme>
    <ThemeProvider theme={themeMode}>
    <GlobalStyle/>
    <div className="App">
      <BrowserRouter>
      <Header/>
      <LineMain/>
      <main>
      {loading ? 
        <p>Laddar...</p>: <>
      {error ? 
        <p>Något är fel på databasen</p>: 
        <Routing 
      loading = {loading}
      error = {error}
      courses= {courses}
      students = {students}
      teachers={teachers}
      competences={competences}/>}
      </>}
      </main>
      <LineMain/>
      <Footer 
      data-testid="footer">
        <Toggle 
        theme={theme} 
        toggleTheme={themeToggler} 
        /> 
      <LinksInFooter
      />
      </Footer>
      </BrowserRouter>
    </div>
    </ThemeProvider>
    </Theme>
    </Fragment>
    </FirebaseContext.Provider>
  );
}

export default App;


function Data({db}) {
 const firebase = useFirebase()
 const [data, setData] = useState([])
 useEffect(() => {
  getDatabase().ref("/courses").on("value").then(snapshot => {
    setData(snapshot.value)
  })
 }, [firebase])
 return (
  <div>
    Test: {data}
  </div>
 )
}