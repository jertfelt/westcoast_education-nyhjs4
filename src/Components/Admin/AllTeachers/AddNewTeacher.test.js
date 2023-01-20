import { render, screen} from '@testing-library/react';
import AddNewTeacher from './AddNewTeacher';


describe("Addkurs component", () => {

  it("should have a wrapping component which fetches from db", () =>{
    render(<AddNewTeacher/>)
    expect(screen.getByTestId("addkurswrapper")).toBeInTheDocument()
  })

})