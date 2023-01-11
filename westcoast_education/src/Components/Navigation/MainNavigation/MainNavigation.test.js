import { render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event';
import MainNavigation from './MainNavigation';
import { BrowserRouter } from 'react-router-dom';
import App from '../../../App';

describe("Menu button", () => {

  it("should reveal a dropdown menu when pressed", () => {
    render(<MainNavigation/>, {wrapper: BrowserRouter});
    userEvent.click(screen.getByRole("button", {name: /meny/i}));
    expect(screen.getByTestId("dropdown")).toBeInTheDocument()
  })
  it("should route to login site when login button is pressed", async () => {
    render(<MainNavigation/>, {wrapper: BrowserRouter}, );
    await userEvent.click(screen.getByRole("button", {name: /meny/i}));
    expect(screen.getByTestId("dropdown")).toBeInTheDocument()
    await userEvent.click(screen.getByText("Logga in"))
    const loginButt = screen.getByRole("link", {name:"Logga in"})
    expect(loginButt).toHaveAttribute('href', '/login')
  })
  it("should route to homepage site when homepage button is pressed", async () => {
    render(<MainNavigation/>, {wrapper: BrowserRouter}, );
    await userEvent.click(screen.getByRole("button", {name: /meny/i}));
    expect(screen.getByTestId("dropdown")).toBeInTheDocument()
    await userEvent.click(screen.getByText("Start"))
    const startButt = screen.getByRole("link", {name:"Start"})
    expect(startButt).toHaveAttribute('href', '/')
  })
  it("should close the dropdown menu when the close button is pressed", async () => {
    render(<MainNavigation/>, {wrapper: BrowserRouter});
    userEvent.click(screen.getByRole("button", {name: /meny/i}));
    expect(screen.getByTestId("dropdown")).toBeInTheDocument()
    await userEvent.click(screen.getByRole("button", {name:"Stäng"}))
    expect(screen.queryByTestId("dropdown")).not.toBeInTheDocument()
  })
})

