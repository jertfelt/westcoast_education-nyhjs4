import { render, screen} from '@testing-library/react';
import KursAddOrChange  from './KursAddOrChange';
import { MemoryRouter } from 'react-router-dom';


describe("Kurs component", () => {
  const setup = () => {render(<KursAddOrChange/>, {wrapper: MemoryRouter})}

  describe("should have a button for publishing", () => {
    it("should exist", () =>{
      setup()
      expect(screen.getByTestId("testingPublishBtn")).toBeInTheDocument()
    })
  })
})