import {  render, screen } from '@testing-library/react';
import Registrering from "./Registrering"
import userEvent from '@testing-library/user-event';

describe("Register page", () => {
  const setup = () => render(<Registrering/>)
  describe("should be layouted", () => {
    it("will have a title 'Registrera dig på en kurs'", () => {
      setup();
      expect(screen.getByRole("heading",{name:/Registrera dig på en kurs/i})).toBeInTheDocument()
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
      it("should display the correct number of options", () => {
        setup()
        //since the courses can be more than initial, I'm just going to test that it is more than 0 because then it has rendered properly from db
        expect(screen.getAllByRole("option").length).not.toBe(0)
      })
      it("should allow user to change course", () => {
        setup()
        userEvent.selectOptions(
          screen.getByLabelText("Kursval 2:"),
          screen.getByTestId("IngetVal")
        )
        expect(screen.getByTestId("IngetVal").selected).toBe(true)
      })
    })
    
  })
  describe("form behaviours", () => {
    //skipped this because unsure on how to test after the option value since it can be changed depending on props. 
    xit("should not work to submit without choosing an option in the first select menu", () => {
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