import { render, screen } from '@testing-library/react';
import HomePage from './Homepage';

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
    it("should have a list of all courses", () => {
      setup();
      expect(screen.getByTestId("allCourses")).toBeInTheDocument()
    })
  })
})