import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddKurs from './AddKurs';


describe("Addkurs component", () => {

  it("should have a wrapping component which fetches from db", () =>{
    render(<AddKurs/>)
    expect(screen.getByTestId("addkurswrapper")).toBeInTheDocument()
  })

})