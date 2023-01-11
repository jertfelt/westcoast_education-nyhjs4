import { Fragment } from "react";

//*----styling and darkmode/lightmode:
import Theme from "./styling/Theme";
import GlobalStyle from './styling/globalStyles';
import { useDarkMode } from "./Components/ThemeModes/useDarkMode";
import { lightTheme, darkTheme } from "./styling/Theme";
import { ThemeProvider } from "styled-components";
import Toggle from "./Components/ThemeModes/Toggler";
import styled from "styled-components"

//*---routing
import {  Routes, Route, BrowserRouter } from "react-router-dom";
import MainNavigation from "./Components/Navigation/MainNavigation/MainNavigation";
import { lazy } from "react";
import HomePage from "./Pages/Startsida/Homepage";
import Login from "./Pages/Login/Login"
import AllaKurser from "./Pages/AllaKurser/AllaKurser"
import AdminSite from "./Pages/AdminSite/AdminSite"

const NoMatch = lazy(() => import('./Pages/NoMatch'));


//*--header
const Header = styled.header`
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
      <Header>
        <h1>Westcoast Education</h1>
        <MainNavigation theme={theme}/>
        <Toggle theme={theme} 
        toggleTheme={themeToggler} 
        />
      </Header>
      
      <main className="app-main">
      <Routes>
        <Route path="/" 
        element={<HomePage/>}/>
        <Route path="/login"
        element={<Login/>}/>
        <Route path="/admin" element={<AdminSite/>}/>
        <Route path="/kurser" element={<AllaKurser/>}/>
        <Route path="*" element={<NoMatch/>}/>
      </Routes>
      </main>
      </BrowserRouter>
    </div>
    </ThemeProvider>
    </Theme>
    </Fragment>
  );
}

export default App;
