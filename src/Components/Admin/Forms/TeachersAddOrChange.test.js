import { render, screen} from '@testing-library/react';
import TeachersAddOrChange from "./TeacherAddOrChange"
import { MemoryRouter } from 'react-router-dom';


describe("Lärare component", () => {
  const setup = () => {render(<TeachersAddOrChange/>, {wrapper: MemoryRouter})}

  it("should have an input for mobile", () =>{
    setup()
    expect(screen.getByLabelText("Mobilnummer:")).toBeInTheDocument()
  })

  it("should have an input element that submits the form", () => {
    setup()
    expect(screen.getByDisplayValue("Spara")).toBeInTheDocument()

  })

  describe("should have buttons at the bottom", () => {
    it("one button that says 'close'", () =>{
      setup()
      expect(screen.getByText("Stäng formulär")).toBeInTheDocument()
    })
    
  })
})