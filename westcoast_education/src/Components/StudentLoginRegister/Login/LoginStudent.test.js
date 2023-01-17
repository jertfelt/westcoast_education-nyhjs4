import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginStudent from './LoginStudent';

describe("Login section", () => {
  const setup = () => render(<LoginStudent/>)

  it("should have a button", () => {  
    setup()
    expect(screen.getAllByRole("button", {name:/Klicka här/i})).toHaveLength(3)
  })
  describe("button toggles the view depending on if you want to login or register", () => {
    it("should initially ask if you are already a member", () => {
      setup()
      expect(screen.getByTestId("initialQuestion")).toBeInTheDocument()
    })
    it("should change when pressed", () => {
      setup()
      const firstButton = screen.getAllByRole("button", {name:/Klicka här/i}[2])
      expect(screen.getByTestId("initialQuestion")).toBeInTheDocument()
      userEvent.click(firstButton)
      expect(screen.getByTestId("notMemberYet")).toBeInTheDocument()
      userEvent.click()
    })

  })
})