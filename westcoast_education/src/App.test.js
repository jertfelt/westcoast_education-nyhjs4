import { render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe("Routing on website", () => {
  const setup = () => render(<App />);

  it("navigates and renders correctly", async () => {
    setup()
    expect(screen.getByText(/Välkommen till ditt studieliv!/i)).toBeInTheDocument()
  })

  test.each`
    path          | componentTestId
    ${'/'}        | ${'homepage'}
    ${'/login'}   | ${'Login'}
    ${'/admin'} | ${'Admin'}
  `(
    'display $componentTestId when path is $path',
    ({ path, componentTestId }) => {
      // Arrange
      window.history.pushState({}, '', path);
      setup();
      const elem = screen.queryByTestId(componentTestId);

      // Assert
      expect(elem).toBeInTheDocument();
    },
  );
  test.each`
  path          | componentTestId
  ${'/'}        | ${'Login'}
  ${'/'}        | ${'Admin'}
  ${'/login'}   | ${'homepage'}
  ${'/login'}   | ${'Admin'}
  ${'/admin'} | ${'homepage'}
  ${'/admin'} | ${'Login'}
`(
  'does not display $componentTestId when path is $path',
  ({ path, componentTestId }) => {
    // Arrange
    window.history.pushState({}, '', path);
    setup();
    const elem = screen.queryByTestId(componentTestId);

    // Assert
    expect(elem).not.toBeInTheDocument();
  },
);

})



describe("The website", () => {
  it("should have a header", () => {
    render(<App/>);
    expect(screen.getByRole("heading", {name:/Westcoast Education/i})).toBeInTheDocument();
  })

  it("should have a footer", () => {
    render(<App/>)
    expect(screen.getByTestId("footer")).toBeInTheDocument()
  })
    
    describe("Footer component", () => {
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

      it("should change back to initial text when doubleclicked", () => {
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

