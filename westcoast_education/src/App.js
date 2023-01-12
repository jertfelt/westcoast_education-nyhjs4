import {useContext, Fragment, useState } from "react";

//*----styling & darkmode/lightmode:
import Theme from "./styling/Theme";
import GlobalStyle from './styling/globalStyles';
import { useDarkMode } from "./Components/ThemeModes/useDarkMode";
import { lightTheme, darkTheme } from "./styling/Theme";
import { ThemeProvider } from "styled-components";
import Toggle from "./Components/ThemeModes/Toggler";
import styled from "styled-components"

//*---routing
import {BrowserRouter, Link} from "react-router-dom";
import Routing from "./Routes";

//*context
import AuthContext from "./Components/store/auth-context";

//---other components
import Header from "./Components/Header/Header";
import { Line } from "./Components/styling/Line";
const Footer = styled.footer`
display:flex;
align-items:center;
justify-content: space-around;
li{
  list-style:none;
  cursor:pointer;
}
font-family: Sofia Sans;
font-size:1rem;
`
const Button = styled.button`
padding:8px;
border-radius: 30px;
border:none;
background: transparent;
color:${({ theme }) => theme.text};
font-size:1rem;
&:hover,&:focus{
  color: ${({ theme }) => theme.buttonText};
  background: ${({ theme }) => theme.accent};
}
`

function App() {
  const context = useContext(AuthContext)
  const [authenticated, setAuthenticated] = useState(context.isLoggedIn)

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
      <AuthContext.Provider value={{authenticated, setAuthenticated}}>
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
        {authenticated && <>
      <li><Link to="/admin">Admin</Link></li>
      <li><Button onClick={context.onLogout}>Logga ut</Button></li>
      </>
      }
      </Footer>
      </AuthContext.Provider>
      </BrowserRouter>
    </div>
    </ThemeProvider>
    </Theme>
    </Fragment>
  );
}

export default App;
