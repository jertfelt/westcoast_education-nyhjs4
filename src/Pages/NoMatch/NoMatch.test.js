import { render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import NoMatch from './NoMatch';

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom")),
  useNavigate: () => mockedUsedNavigate
}));

describe("NoMatch component", () => {
  const setup = () =>  render(<NoMatch/>, {wrapper: BrowserRouter});

  it("renders correctly", () => {
    setup()
    expect(screen.getByText(/Oops!/i)).toBeInTheDocument()
  })
  it("should have a button that navigates you back one step", async () => {
    setup()
    const button = screen.getByRole("button", {name:/gå tillbaka/i})
    expect(button).toBeInTheDocument()
    await userEvent.click(button)
    expect(mockedUsedNavigate).toHaveBeenCalledWith(-1)
  })

})