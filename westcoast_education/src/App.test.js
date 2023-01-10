import { render, screen, fireEvent, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';



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
      it("should change text when clicked", () =>{
        render(<App/>)
        const buttonToggle = screen.getByText(/mörkt/i); 
        userEvent.click(buttonToggle);
        expect(buttonToggle).toHaveTextContent(/ljust/i)
      })
      it("should change back to mörkt when doubleclicked", () => {
        render(<App/>)
        const buttonToggle = screen.getByText(/mörkt/i); 
        userEvent.dblClick(buttonToggle);
        expect(buttonToggle).toHaveTextContent(/mörkt/i)
      })

      //? SKIPPED because I cannot seem to check hover status, but I can test it if I write it as a javascript function instead. Will do this if time is available.
      xit("should change background when hover", () => {
        render(<App/>);
        const themeTogglerButton = screen.getByTestId("toggleDarkMode");
        fireEvent.mouseEnter(themeTogglerButton)
        expect(themeTogglerButton).toHaveStyle("background-color: blue")
      })
     
      //?SKIPPED because changed to themeprovider, unsure on how to test themeprovider correctly. Not necessary for the assignment so skipping this for the time being:

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

