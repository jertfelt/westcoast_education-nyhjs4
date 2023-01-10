import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MainNavigation from './MainNavigation';
describe("Navigation component", () => {
  it("should exist", () => {
    render(<MainNavigation/>);
    expect(screen.getByRole("nav", {name:"meny/i"})).toBeInTheDocument();
  })
})