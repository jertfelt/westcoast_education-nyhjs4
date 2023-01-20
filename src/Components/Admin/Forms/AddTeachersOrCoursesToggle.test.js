import { render, screen} from '@testing-library/react';
import AddTeacherOrCourseToggle from './AddTeachersOrCoursesToggle';
import { MemoryRouter } from 'react-router-dom';


describe("Toggle component", () => {
  const setup = () => {render(<AddTeacherOrCourseToggle/>, {wrapper: MemoryRouter})}

  it("should have a select with options in it", () => {
    setup()
    expect(screen.getByLabelText("Välj:")).toBeInTheDocument()
    expect(screen.getAllByRole("option")).not.toHaveLength(0)
  })


 
})