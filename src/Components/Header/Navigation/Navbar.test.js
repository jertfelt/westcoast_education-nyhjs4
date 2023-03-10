import { render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event';
import Navbar from "./Navbar"
import { MemoryRouter } from 'react-router-dom';


describe("Menu button", () => {
  it("should reveal a dropdown menu when pressed", () => {
    render(<Navbar/>, {wrapper: MemoryRouter});
    userEvent.click(screen.getByRole("button", {name: /meny/i}));
    expect(screen.getByTestId("dropdown")).toBeInTheDocument()
  })
  it("if not logged in, should route to login site when admin link is pressed", async () => {
    render(<Navbar/>, {wrapper: MemoryRouter}, );
    await userEvent.click(screen.getByRole("button", {name: /meny/i}));
    expect(screen.getByTestId("dropdown")).toBeInTheDocument()
    await userEvent.click(screen.getByText("Admin"))
    
    expect(screen.getByText("Admin")).toHaveAttribute('href', '/admin/login')
  })
  it("should route to homepage site when homepage button is pressed", async () => {
    render(<Navbar/>, {wrapper: MemoryRouter}, );
    await userEvent.click(screen.getByRole("button", {name: /meny/i}));
    expect(screen.getByTestId("dropdown")).toBeInTheDocument()
    await userEvent.click(screen.getByText("Start"))
    const startButt = screen.getByText("Start")
    expect(startButt).toHaveAttribute('href', '/')
  })
  it("should close the dropdown menu when the close button is pressed", async () => {
    render(<Navbar/>, {wrapper: MemoryRouter});
    userEvent.click(screen.getByRole("button", {name: /meny/i}));
    expect(screen.getByTestId("dropdown")).toBeInTheDocument()
    await userEvent.click(screen.getByRole("button", {name:"Stäng"}))
    expect(screen.queryByTestId("dropdown")).not.toBeInTheDocument()
  })
  xit("should close the dropdown menu when the links are clicked", async () => {
    render(<Navbar/>, {wrapper: MemoryRouter});
  })
})

