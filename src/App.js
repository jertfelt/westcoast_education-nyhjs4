import { Fragment} from "react";

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


function App() {

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
      <Routing />
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
