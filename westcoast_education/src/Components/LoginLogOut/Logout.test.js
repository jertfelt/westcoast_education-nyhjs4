import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LogOut from './Logout';

describe("Logout button", () => {
  it("should exist a logout btn", () => {
    render(<LogOut/>)
    expect(screen.getByText("Logga ut")).toBeInTheDocument()
  })
})