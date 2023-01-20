import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './AdminLogin';
import { MemoryRouter } from 'react-router-dom';

describe("Login page", () => {
  const setup = () => render(<Login/>, {wrapper: MemoryRouter})
  it("should have an username input", () => {
    setup()
    expect(screen.getByPlaceholderText("Användarnamn")).toBeInTheDocument()
  })
  it("should have a password input", () => {
    setup()
    expect(screen.getByPlaceholderText("********")).toBeInTheDocument()
  })
  it("should have a login button", () => {
    setup()
      expect(screen.getByRole('button', {name: "Logga In"})).toBeInTheDocument()
  })
})

describe("Interactions", () => {
  const setup = () => render(<Login/>, {wrapper: MemoryRouter})
 
  describe("login btn", () => {
    it("should be disabled initially", () => {
      setup()
      expect(screen.getByRole('button', {name: "Logga In"})).toBeDisabled()
    })
    it("should be enabled when username and password have values", () => {
      setup()
      const username = screen.getByPlaceholderText("Användarnamn");
      const password = screen.getByPlaceholderText("********");
      userEvent.type(username, "Admin");
      userEvent.type(password, "pass123");
      expect(screen.getByRole('button', {name: "Logga In"})).toBeEnabled()
    })
  })

  describe("Modal", () => {
    xit("should show a message if there is something faulty with the username/password",() => {
      setup()
      const username = screen.getByPlaceholderText("Användarnamn");
      const password = screen.getByPlaceholderText("********");
      userEvent.type(username, "Kaos")
      userEvent.type(password, "dd")
      //*expect
      
    })
    xit("should not show when you succeed", () => {
      setup()
    })
  })

})