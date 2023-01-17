import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LogOut from './Logout';
import { MemoryRouter } from 'react-router-dom';

describe("Logout button", () => {
  it("should exist a logout btn", () => {
    render(<LogOut/>, {wrapper: MemoryRouter})
    expect(screen.getByText("Logga ut")).toBeInTheDocument()
  })
  
})