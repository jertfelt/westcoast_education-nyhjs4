import { render, screen } from '@testing-library/react';
import AllaKurser from './AllaKurser';

describe ("Alla kurser component", () => {
  const setup = () => render(<AllaKurser/>)
  describe("should be layouted", () => {
  it("will have a title with the name 'Kurser 2023'", () => {
    setup();
    expect(screen.getByRole("heading")).toHaveTextContent(/Kurser 2023/i);
  })
  })
  describe("Api request", () => {
    it("Renders a list of vehicles if request is successful", async () => {
      setup();
      window.fetch = jest.fn()
      window.fetch.mockResolvedValueOnce({
        json:async() => [
          {
            "courseID": 1,
            "courseName": "English A",
            "lengthWeeks": 3,
            "courseDescription": "English for beginners",
            "startDate": "2023-04-23"
      }]
    })
    const courses = await screen.findAllByRole("listitem");
      expect(courses).not.toHaveLength(0)
    })
  })
} 

)