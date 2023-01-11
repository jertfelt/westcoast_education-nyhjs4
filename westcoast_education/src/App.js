import { Fragment } from "react";

//*----styling and darkmode/lightmode:
import Theme from "./styling/Theme";
import GlobalStyle from './styling/globalStyles';
import { useDarkMode } from "./Components/ThemeModes/useDarkMode";
import { lightTheme, darkTheme } from "./styling/Theme";
import { ThemeProvider } from "styled-components";
import Toggle from "./Components/ThemeModes/Toggler";
import styled from "styled-components"
import { Line } from "./Components/styling/Line";

//*---routing
import {  Routes, Route, BrowserRouter} from "react-router-dom";
import { lazy } from "react";
import HomePage from "./Pages/Startsida/Homepage";
import Login from "./Pages/Login/Login"
import AdminSite from "./Pages/AdminSite/AdminSite"
import Registrering from "./Pages/RegisterStudent/Registrering";

//components
import Header from "./Components/Header/Header";
import Routing from "./Routes";
const NoMatch = lazy(() => import('./Pages/NoMatch/NoMatch'));

const Footer = styled.footer`
display:flex;
align-items:center;
justify-content: space-around;
`

function App() {
  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  if(!mountedComponent) return <div/>
  return (
    <Fragment>
    <Theme>
    <ThemeProvider theme={themeMode}>
    <GlobalStyle/>  
    <div className="App" data-testid="wholeapp"
    >
      <BrowserRouter>
      <Header theme={themeMode}/>
      <Line/>
      <main>
        <Routing/>
      </main>
      <Line/>
      <Footer data-testid="footer">
        <Toggle theme={theme} 
        toggleTheme={themeToggler} 
        />  
        <p>En hemsida programmerad av Tova Jertfelt</p>
      </Footer>
      </BrowserRouter>
    </div>
    </ThemeProvider>
    </Theme>
    </Fragment>
  );
}

export default App;
