import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

import MockTheme from './styling/MockTheme';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from "./styling/Theme";
import { useDarkMode } from "./Components/ThemeModes/useDarkMode";
import GlobalStyle from './styling/globalStyles';

describe("Homepage component", () => {
  it("should have a header", () => {
    render(<App/>);
    expect(screen.getByText(/Westcoast Education/i)).toBeInTheDocument();
  })
  
  describe("Header component", () => {
    it("should have a darkmode button", () => {
      render(<App/>);
      expect(screen.getByRole("button", {name: "Mörkt tema"})).toBeInTheDocument();
    })
    describe("Darkmode button", () => {
      it("should change text when clicked",  () => {
        render(<App/>);
        const themeToggler = screen.getByRole("button", {name:"Mörkt tema"});
        userEvent.click(themeToggler);
        expect(screen.getByRole("button", {name:"Ljust tema"})).toBeInTheDocument();
      })

      it("should change background when clicked", () => {
        render(<App/>);
        const themeTogglerButton = screen.getByTestId("toggleDarkMode");
        userEvent.click(themeTogglerButton);
        expect(themeTogglerButton).toHaveStyle("background-color: lightgray")
      })

      //?skipped because changed to themeprovider, unsure on how to test themeprovider correctly

      xit("should change website background color when clicked", async () => {

        render(<App/>)
        const themeTogglerButton = screen.getByTestId("toggleDarkMode");

        const appBackground = screen.getByTestId("wholeapp")

        expect(themeTogglerButton).toBeInTheDocument();

        expect(appBackground).toHaveStyle("background-color: lightgray")

        await userEvent.click(themeTogglerButton);

        
        expect(appBackground).toHaveStyle("background-color: #363537")
     
     
      })
    })
  })
  
  
}) 

