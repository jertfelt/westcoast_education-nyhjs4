import { ThemeProvider } from "styled-components";

const overallTheme = {
  fontSizes: {
    small: "1em",
    medium: "2em",
    large: "3em"
  },
}

export const lightTheme = {
  body: '#e2e2e2',
  text: '#363537',
  buttonText: "pink",
  toggleBorder: '#FFF',
  background: 'darkslateblue',
  buttonBackground: "#363537",
  accent: "#b86dd6",
  highlight: "#cbb1e1",
  link :"#FFF",
}
// '#222b2a'
export const darkTheme = {
  body: '#363537',
  text: "white",
  toggleBorder: "white",
  background: '#b8baba',
  buttonText: "#222b2a",
  buttonBackground: "lightgray",
  accent:  "#1E90FF",
  highlight: "lightblue",
  link: "pink",
}

export const Theme = ({ children }) => (
  <ThemeProvider theme={overallTheme}>{children}</ThemeProvider>
);

export default Theme