import Theme from "./styling/Theme";
import styled from "styled-components";
import GlobalStyle from './styling/globalStyles';
import { useDarkMode } from "./Components/ThemeModes/useDarkMode";
import { Fragment } from "react";
import { lightTheme, darkTheme } from "./styling/Theme";
import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import Toggle from "./Components/ThemeModes/Toggler";

function App() {
  const [theme, themeToggler] = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;

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
