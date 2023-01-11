import { Fragment } from "react";

//*----styling & darkmode/lightmode:
import Theme from "./styling/Theme";
import GlobalStyle from './styling/globalStyles';
import { useDarkMode } from "./Components/ThemeModes/useDarkMode";
import { lightTheme, darkTheme } from "./styling/Theme";
import { ThemeProvider } from "styled-components";
import Toggle from "./Components/ThemeModes/Toggler";
import styled from "styled-components"

//*---routing
import {BrowserRouter} from "react-router-dom";
import Routing from "./Routes";

//*---context


//---other components
import Header from "./Components/Header/Header";
import { Line } from "./Components/styling/Line";
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
    <div className="App">
      <BrowserRouter>
      <Header/>
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
