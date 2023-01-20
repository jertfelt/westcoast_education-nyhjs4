import { render, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Admin from './Admin';

describe("Admin page", () => {
  const setup = () => render (<Admin/>, {wrapper: MemoryRouter})
  it("should render all teachers", () => {
    setup()
    expect(screen.getAllByTestId("allTeachers")).not.toHaveLength(0)
  })
  it("should render all courses", () => {
    setup()
    expect(screen.getByTestId("allakurser")).toBeInTheDocument()
  })
})