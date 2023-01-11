import { render, screen, within} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event';
import MainNavigation from './MainNavigation';


describe("Navigation component", () => {
  describe("should have a meny button", () => {
    render(<MainNavigation/>);
    expect(screen.getByRole("button", {name: /meny/i})).toBeInTheDocument();

  //* skipped for the time being because I can't figure out how to create a mockPortal
  xit("should reveal a dropdown menu when pressed", () => {
    render(<MainNavigation/>);
    userEvent.click(screen.getByRole("button", {name: /meny/i}));
  })
})})
