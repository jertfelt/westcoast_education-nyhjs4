import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AllaKurser from './AllaKurser';
import { MemoryRouter } from 'react-router-dom';

describe("Alla kurser", () => {
  const setup = () => {render(<AllaKurser/>)}

  it("Should not reveal list if fetch is unsuccessful", () => {
    setup()
    expect(screen.queryByTestId("Antal studenter:")).not.toBeInTheDocument()
  })
})

