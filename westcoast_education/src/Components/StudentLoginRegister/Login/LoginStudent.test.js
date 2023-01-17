import { render, screen } from '@testing-library/react';

import LoginStudent from './LoginStudent';


describe("Login section", () => {
  const setup = () => render(<LoginStudent/>)
  
  it("should have an username input", () => {
    setup()
    expect(screen.getByPlaceholderText("Användarnamn:")).toBeInTheDocument()
  })
})