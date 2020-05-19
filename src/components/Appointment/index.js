import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "../../hooks/useVisualMode";

export default function Appointment(props) {

  const SHOW = "SHOW";
  const EMPTY = "EMPTY";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const CONFIRM = "CONFIRM";
  const SAVING = "SAVING";
  const ERROR_SAVE = "ERROR_SAVE";
  const DELETING = "DELETING";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const onAdd = () => {
    transition(CREATE);
  }

  function editAppt() {
    transition(EDIT);
  }

  function confirmDelete() {
    transition(CONFIRM);
  }

  const goBack = () => {
    back();
  }

  async function save(name, interviewer) {
    try {
      const interview = {
        student: name,
        interviewer
      };
      transition(SAVING);
      await props.bookInterview(props.id, interview)
      transition(SHOW);
    }
    catch {
      transition(ERROR_SAVE, true);
    }
  }

  async function deleteInterview() {
    try {
      transition(DELETING, true);
      await props.cancelInterview(props.id);
      transition(EMPTY);
    }
    catch {
      transition(ERROR_DELETE, true);
    }
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === CONFIRM && <Confirm
        message="Are you sure you would like to delete?"
        onConfirm={deleteInterview}
        onCancel={goBack}
      />}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === ERROR_SAVE && <Error
        message="Cannot save appointment."
        onClose={goBack}
      />}
      {mode === ERROR_DELETE && <Error
        message="Cannot delete appointment."
        onClose={goBack}
      />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirmDelete}
          onEdit={editAppt}
        />
      )}
      {mode === CREATE &&
        <Form
          student={''}
          interviewers={props.interviewers}
          val={null}
          onCancel={goBack}
          onSave={save}
        />}
      {mode === EDIT &&
        <Form
          student={props.interview.student}
          interviewers={props.interviewers}
          val={props.interview.interviewer.id}
          onCancel={goBack}
          onSave={save}
        />}
    </article>
  );
}
