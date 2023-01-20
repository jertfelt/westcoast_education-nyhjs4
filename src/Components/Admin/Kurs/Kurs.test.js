import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Kurs from './Kurs';
import { MemoryRouter } from 'react-router-dom';


describe("Kurs component", () => {
  const setup = () => {render(<Kurs/>, {wrapper: MemoryRouter})}

  it("should have a title that says 'Kursdetaljer'", () =>{
    setup()
    expect(screen.getByText("Kursdetaljer")).toBeInTheDocument()
  })

})