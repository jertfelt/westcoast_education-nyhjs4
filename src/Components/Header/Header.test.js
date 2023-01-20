import { render, screen,} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

describe("Header", () => {
  it("should have a menu button", () => {
    render(<Header/>, {wrapper: MemoryRouter});
    expect(screen.getByRole("button", {name: /meny/i})).toBeInTheDocument();
  })
})