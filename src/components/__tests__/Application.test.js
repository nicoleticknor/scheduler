import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
  getByText,
  prettyDOM,
  queryByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText
} from "@testing-library/react";
import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  xit("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"))
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  xit("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {

    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"))

    const appointments = getAllByTestId(container, 'appointment');
    const appointment = appointments[0]

    fireEvent.click(getByAltText(appointment, 'Add'));
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
    fireEvent.click(getByText(appointment, 'Save'));
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, 'day').find(d => queryByText(d, 'Monday'));
    expect(getByText(day, '0 spots remaining')).toBeInTheDocument()

  });


  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {

    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the first full appointment.
    const appointments = getAllByTestId(container, 'appointment');
    const appointment = appointments.find(a => queryByText(a, "Archie Cohen"));
    // console.log(prettyDOM(appointment));


    fireEvent.click(getByAltText(appointment, 'Delete'));

    // 4. Click the Confirm button 
    const confirm = await waitForElement(() => queryByText(container, "delete"));
    debug();
    // fireEvent.click(getByText(appointment, 'Save'));
    // expect(getByText(appointment, "Saving...")).toBeInTheDocument();


    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    /*
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, 'Save'));
    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();
    // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const day = getAllByTestId(container, 'day').find(d => queryByText(d, 'Monday'));
    expect(getByText(day, '0 spots remaining')).toBeInTheDocument()
    
      */
  });

  xit("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"))

  });
  xit("shows the save error when failing to save an appointment", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"))

  });
  xit("shows the delete error when failing to delete an existing appointment", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"))

  });

});
