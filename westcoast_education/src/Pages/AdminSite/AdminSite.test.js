import { render, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import AdminSite from './AdminSite';


describe("Adminsite", () =>{
  render (<AdminSite/>)
  it("should show login component when not logged in", () => {

  })
  it("should show admin site when logged in", () => {

  })
})