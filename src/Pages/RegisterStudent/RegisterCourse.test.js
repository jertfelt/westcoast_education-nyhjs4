import {  render, screen } from '@testing-library/react';
import RegisterCourseForm from './RegisterCourseForm';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

describe("Register page", () => {
  const setup = () => render(<RegisterCourseForm/>, {wrapper: MemoryRouter})
  describe("should be layouted", () => {
    it("will have a title welcoming ", () => {
      setup();
      expect(screen.getByTestId("welcome")).toBeInTheDocument()
    })
    xit("should have the logged in students name in the name input as a default", () => {
      setup()
      
    } )
  })
  describe("should have a form element", () => {
    it("should have two select components", () => {
      setup()
      expect(screen.getAllByRole("combobox").length).toBe(2)
    })
    describe("select components", () => {
      it("should have a correctly set default option", () => {
        setup()
        expect(screen.getByTestId("optionDefault").selected).toBe(true)
      })
      it("should display options rendered", () => {
        setup()
       
        expect(screen.getAllByRole("option").length).not.toBe(0)
      })
      xit("should allow user to change course", () => {
        setup()
        userEvent.selectOptions(
          screen.getByLabelText("**Kursval 2:"),
          screen.getByTestId("Ingen")
        )
        expect(screen.getByTestId("Ingen").selected).toBe(true)
      })
    })
    
  })
  describe("form behaviours", () => {
   
    it("should not work to submit without choosing an option in the first select menu", () => {
      setup()
      userEvent.selectOptions(
        screen.getByLabelText("Kursval 1:"),
        screen.getAllByRole("option")[0]
      )
    })
   
    xit("when submitted, a modal with confirmation should be shown", async () => {

    })
  })
})