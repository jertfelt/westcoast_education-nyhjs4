import {useContext, Fragment} from "react";

//*----styling & darkmode/lightmode:
import Theme, { lightTheme, darkTheme }  from "./Context/styling/Theme";
import GlobalStyle from "./Context/styling/globalStyles";
import { useDarkMode } from "./Components/ThemeModes/useDarkMode";
import { ThemeProvider } from "styled-components";


//*toggler darkmode/lightmode
import Toggle from "./Components/ThemeModes/Toggler";

//*---routing
import {BrowserRouter, Link} from "react-router-dom";
import Routing from "./Config/Routes"

// //*context
import AuthContext from "./Context/Auth.Context";
import StudentContext from "./Context/StudentContext";

//*---other components
import Header from "./Components/Header/Header";
import { Line } from "./Components/StylingElements/Line/Line";
import {FooterStyle as Footer} from "./Components/StylingElements/Footer/FooterStyles"


function App() {
  const context = useContext(AuthContext)
  const contextStudent = useContext(StudentContext)
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
      <Routing 
      />
      </main>
      <Line/>
      <Footer 
      data-testid="footer">
        <Toggle 
        theme={theme} 
        toggleTheme={themeToggler} 
        />  
      {context.loggedIn  && <>
      <li>
        <Link to="/admin">
          Admin</Link>
        </li>
      <li>
        <button onClick={context.onLogout}>
          Logga ut</button>
        </li>
      </>
      }
      {!context.loggedIn && <>
        {contextStudent.studentLoggedIn && <>
        <li>
          <Link to="/student">
            Studentportal</Link>
        </li>
        <li>
          <button onClick={contextStudent.onLogout}>
            Logga ut</button>
            </li> 
        </>}
      </>}
      </Footer>
      </BrowserRouter>
    </div>
    </ThemeProvider>
    </Theme>
    </Fragment>
  );
}

export default App;
