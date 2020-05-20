import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
  getByText,
  prettyDOM,
  queryByText,
  getByDisplayValue,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText
} from "@testing-library/react";
import Application from "components/Application";
import axios from "axios";

afterEach(cleanup);

describe("Application", () => {

  xit("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"))
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  xit("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {

    const { container } = render(<Application />);
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

  xit("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, 'appointment').find(a => queryByText(a, "Archie Cohen"));
    fireEvent.click(getByAltText(appointment, 'Delete'));

    const confirmButton = await waitForElement(() => getByText(container, "Confirm"));
    fireEvent.click(getByText(confirmButton, 'Confirm'));
    expect(getByText(appointment, 'Deleting...')).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "1pm"));

    const day = getAllByTestId(container, 'day').find(d => queryByText(d, 'Monday'));
    expect(getByText(day, '2 spots remaining')).toBeInTheDocument();
  });

  xit("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application
    const { container, debug } = render(<Application />);
    //2. Wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //3. Click the "Edit" Button on the booked appointment
    const appointment = getAllByTestId(container, 'appointment').find(a => queryByText(a, "Archie Cohen"));
    fireEvent.click(getByAltText(appointment, 'Edit'));
    //4. Change the Student Name and Interviewer
    fireEvent.change(getByDisplayValue(appointment, "Archie Cohen"), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, 'Tori Malcolm'));
    //5. Click the Save Button
    fireEvent.click(getByText(appointment, 'Save'));
    //6. Check that an element with the text "Saving..." is displayed
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();
    //7. Wait until the element with the text "Lydia Miller-Jones"  is displayed
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    //8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining"
    const day = getAllByTestId(container, 'day').find(d => queryByText(d, 'Monday'));
    expect(getByText(day, '1 spot remaining')).toBeInTheDocument();
  });
  xit("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //3. Click the "Edit" Button on the booked appointment
    const appointment = getAllByTestId(container, 'appointment').find(a => queryByText(a, "Archie Cohen"));
    fireEvent.click(getByAltText(appointment, 'Edit'));
    //4. Change the Student Name and Interviewer
    fireEvent.change(getByDisplayValue(appointment, "Archie Cohen"), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, 'Tori Malcolm'));
    //5. Click the Save Button
    fireEvent.click(getByText(appointment, 'Save'));
    //6. Check that an element with the text "Saving..." is displayed
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();
    //7. Wait until the text "Error" is displayed
    await waitForElement(() => getByText(container, "Error"));
    //8. Click the Close button
    fireEvent.click(getByAltText(appointment, 'Close'));
    //9. Check that the element with the Save button is displayed
    expect(getByText(appointment, "Save")).toBeInTheDocument();
    //10. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining"
    const day = getAllByTestId(container, 'day').find(d => queryByText(d, 'Monday'));
    expect(getByText(day, '1 spot remaining')).toBeInTheDocument();
    // debug();
  });
  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"))
    //3. Click the "Delete" Button on the booked appointment
    const appointment = getAllByTestId(container, 'appointment').find(a => queryByText(a, "Archie Cohen"));
    fireEvent.click(getByAltText(appointment, 'Delete'));
    //4. wait for the element with the text "Confirm"
    const confirmButton = await waitForElement(() => getByText(container, "Confirm"));
    //5. Click the Confirm button
    fireEvent.click(getByText(confirmButton, 'Confirm'));
    //6. Expect an element with the text "Deleting..."
    expect(getByText(appointment, 'Deleting...')).toBeInTheDocument();
    //7. Wait until the text "Error" is displayed
    await waitForElement(() => getByText(container, "Error"));
    //8. Click the Close button
    fireEvent.click(getByAltText(appointment, 'Close'));
    //9. Check that the element with the text "Archie Cohen" is displayed
    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();
    //10. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining"
    const day = getAllByTestId(container, 'day').find(d => queryByText(d, 'Monday'));
    expect(getByText(day, '1 spot remaining')).toBeInTheDocument();
    // debug();
  });

});
