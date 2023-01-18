import { render, screen,} from '@testing-library/react';

import Header from './Header';

describe("Header", () => {
  it("should have a menu button", () => {
    render(<Header/>);
    expect(screen.getByRole("button", {name: /meny/i})).toBeInTheDocument();
  })
  
})