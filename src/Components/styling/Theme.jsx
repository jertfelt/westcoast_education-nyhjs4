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
  inverText : "white"
}

export const darkTheme = {
  body: '#363537',
  inverText : "black",
  text: "white",
  buttonText: "#e2e2e2",
  toggleBorder: "#67b3c1",
  background: '#111323',
  buttonBackground: "#5461cd",
  accent:  "#5cbae6",
  highlight: "#8b94e2",
  link: "#FFF",
}

export const Theme = ({ children }) => (
  <ThemeProvider theme={overallTheme}>{children}</ThemeProvider>
);

export default Theme