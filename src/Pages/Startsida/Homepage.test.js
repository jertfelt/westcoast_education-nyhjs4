import { render, screen } from '@testing-library/react';
import HomePage from './Homepage';
import { MemoryRouter } from 'react-router-dom';


// //for testing responsiveness:
// const resizeWindow = (x,y) => {
//   window.innerWidth=x;
//   window.innerHeight=y;
//   window.dispatchEvent(new Event("resize")) 
// }

describe ("Homepage component", () => {
  const setup = () => render(<HomePage/>)
  describe("should be layouted", () => {
    it("will have a title with the name 'Välkommen till ditt studieliv!'", () => {
      setup();
      expect(screen.getByRole("heading",{name:/Välkommen till ditt studieliv!/i})).toBeInTheDocument()
    })
    it("should have a landing page image to show", () => {
      setup();
      expect(screen.getByAltText("Education @ Westcoast")).toBeInTheDocument()
    })
  })
})


describe ("Homepage should have a component for published courses", () => {
  const setup = () => render(<HomePage/>, {wrapper: MemoryRouter})
  describe("should be layouted", () => {
    it("will have a title 'Våra kurser' and current year", () => {
      setup();
      expect(screen.getByText(/Våra kurser/i)).toBeInTheDocument()
    })
   
  })
})