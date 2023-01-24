import {  render, screen } from '@testing-library/react';
import StudentPortal from './StudentPortal';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

describe("Student portal", () => {
  const setup = () => render(<StudentPortal/>, {wrapper: MemoryRouter})
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
    expect(screen.getByText("Dina uppgifter:")).toBeInTheDocument()
    expect(screen.getAllByTestId("paragraph").length).not.toBe(0)
  })
  it("should have a button that says 'Spara alla ändringar", () => {
    setup()
    expect(screen.getByText(/Spara alla ändringar/i)).toBeInTheDocument()
  })
  describe("should be two buttons that says 'ändra'", () => {
    it("should render properly", () => { 
      setup()
      expect(screen.getAllByTestId("changeParagraph")).toHaveLength(3)
    })
    xit("should show a form when clicked", () => {
      setup()
       userEvent.click(screen.getByTestId("changeParagraph"))
      expect(screen.getByTestId("formTest")).toBeInTheDocument()
      expect(screen.getByTestId("paragraph").classList.contains("offscreen")).toBe(true)
    })
   
  })

})