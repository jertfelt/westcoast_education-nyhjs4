import { render, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminSite from './AdminSite';


describe("Adminsite", () =>{
  const setup = () => render (<AdminSite/>, {wrapper: MemoryRouter})
  it("should show login component when not logged in", () => {
    setup()
    expect(screen.getByTestId("Login")).toBeInTheDocument()
  })
  it("should show admin site when logged in", () => {
    setup()
    expect(screen.getByTestId("Admin")).toBeInTheDocument()
  })
})