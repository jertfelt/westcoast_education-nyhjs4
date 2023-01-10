import { render, screen, within} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event';
import MainNavigation from './MainNavigation';
import App from '../../../App';
import DropDownMenu from '../../ui/Modal/DropDownMenu';

describe("Navigation component", () => {
 
  describe("should have a meny button", () => {
    render(<MainNavigation/>);
    expect(screen.getByRole("button", {name: /meny/i})).toBeInTheDocument();
  
  it("should reveal a dropdown menu when pressed", () => {
    
  })
})})