import React, { useState } from "react";
import InterviewerList from "components/InterviewerList/InterviewerList";
import Button from "components/Button/Button";

export default function Form(props) {

  const [value, setValue] = useState(props.val || null);
  const [name, setName] = useState(props.student || '');
  const [error, setError] = useState('');

  //click handlers
  const reset = () => {
    setName('');
    setValue(null);
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }

  const validate = () => {
    if (name === '') return setError("Student name cannot be blank");
    if (value === null) return setError("Please select an Interviewer")
    setError('');
    props.onSave(name, value);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()}
          autoComplete="off">
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            value={name}
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => { setName(event.target.value) }}
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList interviewers={props.interviewers} value={value} onChange={(value) => { setValue(value) }} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={validate} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
}
