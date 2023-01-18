import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginFormStudent from './LoginFormStudent';

describe("A login form", () => {
  const setup = () => render(<LoginFormStudent/>)
  it("should have a login button", () => {
    setup()
    expect(screen.getByRole("button", {name:/Logga in/i})).toBeInTheDocument()
  })
  xit("should show error message in a portal if there is a wrong password or email", () => {
    setup()
    const passwordInput = screen.getByLabelText("Lösenord")
    const emailInput = screen.getByLabelText("Email:")
    userEvent.type(passwordInput, "")
    userEvent.type(emailInput, "")
  })
})