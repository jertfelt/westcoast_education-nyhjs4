import { render, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Admin from './Admin';

describe("Admin page", () => {
  const setup = () => render (<Admin/>, {wrapper: MemoryRouter})
  it("should render all teachers", () => {

  })
  it("should render all courses", () => {

  })
  it("should have a form where you can add teachers and/or courses", () => {
    
  })
})