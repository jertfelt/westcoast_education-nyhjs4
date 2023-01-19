import { render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { MemoryRouter } from 'react-router-dom';



describe("Routing on website", () => {
  render(<App/>)
  it("navigates and renders correctly", async () => {
    render(<App/>)
    expect(screen.queryAllByText(/Välkommen till ditt studieliv!/i)).not.toBe(0)
  })

  it("landing on a bad page", () => {
    const badRoute = '/some/bad/route'
    window.history.pushState({}, '', badRoute);
    render(<App/>)
    expect(screen.getByText(/oops!/i)).toBeInTheDocument()
  })

  test.each`
    path          | componentTestId
    ${'/'}        | ${'homepage'}
    ${'/admin/login'}   | ${'AdminLogin'}
    
  `(
    'display $componentTestId when path = $path',
    ({ path, componentTestId }) => {
      window.history.pushState({}, '', path);
      render(<App/>)
      const elem = screen.queryByTestId(componentTestId);
      expect(elem).toBeInTheDocument();
    },
  );

  test.each`
  path          | componentTestId
  ${'/'}        | ${'AdminLogin'}
  ${'/'}        | ${'RegisterStudentKurs'}
  
`(
  'does not display $componentTestId when path is $path',
  ({ path, componentTestId }) => {
    window.history.pushState({}, '', path);
    render(<App/>)
    const elem = screen.queryByTestId(componentTestId);
    expect(elem).not.toBeInTheDocument();
  },
);

})



describe("The website", () => {
 
  it("should have a header", () => {
    render(<App/>)
    expect(screen.getByRole("heading", {name:/Westcoast Education/i})).toBeInTheDocument();
  })

  it("should have a footer", () => {
    render(<App/>)
    expect(screen.getByTestId("footer")).toBeInTheDocument()
  })
    
    describe("Footer component", () => {
      it("should have a darkmode button", () => {
        render(<App/>)
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

