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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainNavigation from "./Components/Navigation/MainNavigation/MainNavigation";

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
      <Header>
        <h1>Westcoast Education</h1>
        <MainNavigation></MainNavigation>

      <Toggle theme={theme} 
      toggleTheme={themeToggler} 
      style={{ backgroundColor: theme.buttonBackground}}/>
      </Header>
      
      <main className="App-main">

      </main>
    </div>
    </ThemeProvider>
    </Theme>
    </Fragment>
  );
}

export default App;
