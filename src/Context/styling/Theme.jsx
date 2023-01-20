import React from "react";
import { ThemeProvider } from "styled-components";

const overallTheme = {
  fontSizes: {
    small: "1em",
    medium: "2em",
    large: "3em"
  },
}

export const lightTheme = {
  body: 'lightgray',
  text: '#363537',
  buttonText: "#FFF",
  toggleBorder: '#FFF',
  background: 'gray',
  buttonBackground: "black",
  accent: "darkslateblue",
  highlight: "lightblue",
  link :"blue",
}

export const darkTheme = {
  body: '#363537',
  text: "white",
  toggleBorder: '#222b2a',
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