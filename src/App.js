import { Fragment, useEffect, useState} from "react";

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
import { Line } from "./Components/StylingElements/Line/Line";
import {FooterStyle as Footer} from "./Components/StylingElements/Footer/FooterStyles"
import LinksInFooter from "./Components/FooterLinks/LinksInFooter";


//*firebase:
import initFirebase from "./firebase/initFirebase";
import { child, getDatabase, get, onValue, ref } from "firebase/database";


// export async function getFirebaseData(){
//   initFirebase()
//   const db = getDatabase()
//   const dbRef = ref(db)
//   let teacherData = await get(child(dbRef, "/teachers"))
//   let coursesData = await get(child(dbRef, "/courses"))
//   let studentsData = await get(child(dbRef, "/students"))
//   let competencesData = await get(child(dbRef, "/competences"))
//   return{
//     props:{
//       coursesDb: coursesData.val(),
//       teachersDb: teacherData.val(),
//       studentsDb: studentsData.val(),
//       competencesDb: competencesData.val()
//     }
//   }
// }

export  function GetDb(route1, route2, route3, route4){
  const [courses, setCourses] = useState(null)
  const [students, setStudents] = useState(null)
  const [teachers, setTeachers] = useState(null)
  const [competences, setCompetences] = useState(null)
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(false)
  
  const getDataFromFirebase = (route1, route2, route3, route4) => {
    const db = getDatabase()
    onValue(ref(db, route1), (snapshot) => {
    setCourses(snapshot.val())
   
    })
    onValue(ref(db, route2), (snapshot) => {
    setStudents(snapshot.val())
    })
    onValue(ref(db, route3), (snapshot) => {
    setTeachers(snapshot.val())
    })
    onValue(ref(db, route4), (snapshot) => {
      setCompetences(snapshot.val())
    })
  }
  
  
    useEffect(() => {(
      async function(){
        try{
          setLoading(true)
          initFirebase()
          getDataFromFirebase(route1, route2, route3, route4)
        }catch(err){
          setError(err)
        }finally{
          setLoading(false)
        }
      })()
    },[route1, route2, route3, route4])
    // console.log("within DB:", courses,students,teachers,competences,"error:", error, "loading:", loading)

    return {courses,students,teachers,competences, error, loading}
      
}
  

function App() {

 const {courses,students,teachers,competences, error, loading} = GetDb("/courses", "/students", "/teachers", "/competences")



  //*theme:
  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  if(!mountedComponent) return <div/>
 

  return (
    <Fragment>
      
    <Theme>
    <ThemeProvider theme={themeMode}>
    <GlobalStyle/>
    <div className="App">
      <BrowserRouter>
      <Header/>
      <Line/>
      <main >
      {loading ? 
        <p>Laddar...</p>: <>
      {error ? 
        <p>Något är fel på databasen</p>: 
        <Routing 
      courses= {courses}
      students = {students}
      teachers={teachers}
      competences={competences}/>}
      </>}
      </main>
      <Line/>
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
  );
}

export default App;


