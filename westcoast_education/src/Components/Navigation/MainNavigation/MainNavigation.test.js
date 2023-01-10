import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MainNavigation from './MainNavigation';
describe("Navigation component", () => {
  it("should have a meny button", () => {
    render(<MainNavigation/>);
    expect(screen.getByRole("button", {name: /meny/i})).toBeInTheDocument();
  })
  it("should show dropdown when clicked", () => {
    render(<MainNavigation/>)

    userEvent.click(screen.getByRole("button", {name: /meny/i}))

    expect(screen.getByTestId("dropdown-menu")).toBeInTheDocument()
  
  })
})