import { Fragment } from "react";

//*----styling and darkmode/lightmode:
import Theme from "./styling/Theme";
import GlobalStyle from './styling/globalStyles';
import { useDarkMode } from "./Components/ThemeModes/useDarkMode";
import { lightTheme, darkTheme } from "./styling/Theme";
import { ThemeProvider } from "styled-components";
import Toggle from "./Components/ThemeModes/Toggler";

//*---routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [theme, themeToggler, mountedComponent] = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  if(!mountedComponent) return <div/>

  return (
    <Fragment>
    <Theme>
    <ThemeProvider theme={themeMode}>
    <GlobalStyle/>  
    <div className="App">
      <header className="App-header">
       <h1>Westcoast Education</h1>
       <Toggle theme={theme} toggleTheme={themeToggler} />
      </header>
      <main className="App-main">

      </main>
    </div>
    </ThemeProvider>
    </Theme>
    </Fragment>
  );
}

export default App;
