import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterStudent from './RegisterStudent';

describe("Register a new student component", () => {
  const setup = () => render(<RegisterStudent/>)
  it("Has a form element with a title", () => {
    setup()
    expect(screen.getByText(/Registrera dig:/i)).toBeInTheDocument()
  })
  it("Reveals messages when focusing on the inputs", async () => {
    setup()
    const paragraphInstructions = screen.getAllByTestId("testingParagraph")
    expect(paragraphInstructions.classList.contains("offscreen")).toBe(true)
    await userEvent.onFocus(screen.getByLabelText("Lösenord:"))
    expect(paragraphInstructions.classList.contains("offscreen")).toBe(false)
  })
  it("has a button that is disabled until the passwords matches", () => {
    setup()
    expect(screen.getByRole("input", {name:"Registrera"})).toBeDisabled()
    const passwordInput = screen.getByLabelText("Lösenord:")
    const passwordConfirmInput = screen.getByLabelText("Bekräfta lösenord:")
    userEvent.type(passwordInput, "T3st12345!")
    userEvent.type(passwordConfirmInput, "T3st12345!")
    expect(screen.getByRole("input", {name:"Registrera"})).toBeEnabled()
  })

})