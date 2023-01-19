import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterStudent from './RegisterNewStudent';
import { MemoryRouter } from 'react-router-dom';
import toHaveClass from "@testing-library/jest-dom"


describe("Register a new student component", () => {
  const setup = () => render(<RegisterStudent/>, {wrapper: MemoryRouter})


  it("Has a form element with a title", () => {
    setup()
    expect(screen.getByText(/Registrera dig:/i)).toBeInTheDocument()
  })

  //får det inte att fungera med toHaveClass, försökt installera @testing-library/jest-dom och den ska ha den, så avvaktar med just detta test. Sedan är kanske just denna lösning på errormeddelande inte best practice, skärmläsaren kan ju fortfarande fånga upp den tror jag.
  xit("Reveals messages when focusing on the inputs", async () => {
    setup()
    const paragraphInstructions = screen.getAllByTestId("testingParagraph")
    expect(paragraphInstructions.toHaveClass("offscreen")).toBe(true)
    await userEvent.onFocus(screen.getByLabelText("Lösenord:"))
    expect(paragraphInstructions.toHaveClass("offscreen")).toBe(false)
  })

  xit("has a button that is disabled until the passwords matches", () => {
    setup()
    expect(screen.getByTestId("Submitbtn")).toBeDisabled()
    const passwordInput = screen.getByLabelText("Lösenord:")
    const passwordConfirmInput = screen.getByLabelText("Bekräfta lösenord:")
    userEvent.type(passwordInput, "T3st12345!")
    userEvent.type(passwordConfirmInput, "T3st12345!")
    expect(screen.getByTestId("Submitbtn")).toBeEnabled()
  })

})