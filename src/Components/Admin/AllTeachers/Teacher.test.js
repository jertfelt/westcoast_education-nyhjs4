import { render, screen} from '@testing-library/react';
import Teacher from './Teacher';
import { MemoryRouter } from 'react-router-dom';


describe("Teacher component", () => {
  const setup = () => {render(<Teacher/>, {wrapper: MemoryRouter})}

    it("should exist", () =>{
      setup()
      expect(screen.getByTestId("teacherItem")).toBeInTheDocument()
    })
  
})