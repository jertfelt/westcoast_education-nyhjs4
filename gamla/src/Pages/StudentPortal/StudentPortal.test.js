import {  render, screen } from '@testing-library/react';
import StudentPortal from './StudentPortal';
import userEvent from '@testing-library/user-event';

describe("Student portal", () => {
  const setup = () => render(<StudentPortal/>)
  it("should render properly", () => {
    setup()
    expect(screen.getByTestId("studentportal")).toBeInTheDocument()
  })
  it("should show a profile picture", () => {
    setup()
    expect(screen.getByRole("img")).toBeInTheDocument()
  })
  it("should show account details from context", () => {
    setup()
    expect(screen.getByTitle("Dina uppgifter:")).toBeInTheDocument()
    expect(screen.getByTestId("paragraph")).toBeInTheDocument()
  })
  describe("should be two buttons that says 'ändra'", () => {
    it("should render properly", () => { 
      setup()
      expect(screen.getAllByText("Ändra")).toHaveLength(2)
    })
    it("should show a form when clicked", async() => {
      setup()
      await userEvent.click(screen.getByTestId("changePAragraph"))
      expect(screen.getByTestId("formTest")).toBeInTheDocument()
      expect(screen.getByTestId("paragraph").classList.contains("offscreen")).toBe(true)
    })
   
  })

})