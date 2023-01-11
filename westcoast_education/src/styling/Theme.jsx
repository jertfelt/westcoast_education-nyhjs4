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
  background: '#363537',
  buttonBackground: "#363537",
  accent: "#1E90FF",
  highlight: "midnightblue",
}

export const darkTheme = {
  body: '#363537',
  text: '#FAFAFA',
  toggleBorder: '#6B8096',
  background: 'midnightblue',
  buttonBackground: "lightgray",
  accent:  "#1E90FF",
  highlight: "lightblue",
}

export const Theme = ({ children }) => (
  <ThemeProvider theme={overallTheme}>{children}</ThemeProvider>
);

export default Theme