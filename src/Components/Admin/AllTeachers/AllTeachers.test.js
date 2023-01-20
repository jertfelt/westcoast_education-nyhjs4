import { render, screen} from '@testing-library/react';
import AllTeachers from './AllTeachers';
import { MemoryRouter } from 'react-router-dom';


describe("Kurs component", () => {
  const setup = () => {render(<AllTeachers/>, {wrapper: MemoryRouter})}

  it("should exist", () =>{
    setup()
    expect(screen.getByTestId("allTeachers")).toBeInTheDocument()
  })
  it("should have a title that says ' Alla lärare'", () => {
    setup()
    expect(screen.getByText("Alla lärare")).toBeInTheDocument()
  })
  it("should have a select element", () => {
    setup()
    expect(screen.getByRole("combobox")).toBeInTheDocument()
  })
  it("should have a default option that says 'Välj:'", () => {
    setup()
    expect(screen.getByText("Välj:")).toBeInTheDocument()
  })
})