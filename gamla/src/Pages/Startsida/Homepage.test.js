import { render, screen } from '@testing-library/react';
import HomePage from './Homepage';
import { MemoryRouter } from 'react-router-dom';


//for testing responsiveness:
const resizeWindow = (x,y) => {
  window.innerWidth=x;
  window.innerHeight=y;
  window.dispatchEvent(new Event("resize")) 
}

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
    it("will have a list of courses", async () => {
      setup()
      window.fetch = jest.fn()
      window.fetch.mockResolvedValueOnce({
        json:async () => [
          {"courseID": 1,
        "courseName": "Engelska A",
        "lengthWeeks": 3,
        "courseDescription": "English for beginners",
        "startDate": "2023-23-4",
        "published": true}
        ]
      })
      const courses = await screen.findAllByRole("button")
      expect(courses).not.toHaveLength(0)
    })
  })
})