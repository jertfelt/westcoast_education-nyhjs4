import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginStudent from './LoginStudent';
import { MemoryRouter } from 'react-router-dom';

describe("Login section", () => {
  const setup = () => render(<LoginStudent/>,{wrapper: MemoryRouter})
  it("should have a button", () => {  
    setup()
    expect(screen.getByRole("button", {name:/Klicka här/i})).toBeInTheDocument()
  })
  describe("button toggles the view depending on if you want to login or register", () => {
    it("should initially ask if you are already a member", () => {
      setup()
      expect(screen.getByTestId("initialQuestion")).toBeInTheDocument()
    })
    it("should change when pressed", () => {
      setup()
      expect(screen.getByTestId("initialQuestion")).toBeInTheDocument()
      userEvent.click(screen.getByRole("button", {name:/Klicka här/i}))
      expect(screen.getByTestId("ifNotMember")).toBeInTheDocument()
      userEvent.click(screen.getByRole("button", {name:/Klicka här/i}))
      expect(screen.getByTestId("initialQuestion")).toBeInTheDocument()
    })

  })
})