import React, { useState } from "react";
import InterviewerList from "components/InterviewerList/InterviewerList";
import Button from "components/Button/Button";
import { checkPropTypes } from "prop-types";

export default function Form({ student, interviewers, val, onSave, onCancel }) {

  const [value, setValue] = useState(val || null);
  const [name, setName] = useState(student || '');
  const [error, setError] = useState('');

  const reset = () => {
    setName('');
    setValue(null);
  }

  const cancel = () => {
    reset();
    onCancel();
  }

  const validate = () => {
    if (name === '') {
      setError("Student name cannot be blank")
      return;
    }
    setError('');
    onSave(name, value);
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
        <InterviewerList interviewers={interviewers} value={value} onChange={(value) => { setValue(value) }} />
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
