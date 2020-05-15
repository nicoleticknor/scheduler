import React, { useState } from "react";
import InterviewerList from "components/InterviewerList/InterviewerList";
import Button from "components/Button/Button";

export default function Form({ student, interviewers, val, onSave, onCancel }) {

  const [value, setValue] = useState(val || null);
  const [name, setName] = useState(student || '');

  const reset = () => {
    setName('');
    setValue(null);
  }

  const cancel = () => {
    reset();
    onCancel();
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()}
          autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            value={name}
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => { setName(event.target.value) }}

          /*
            This must be a controlled component
          */
          />
        </form>
        <InterviewerList interviewers={interviewers} value={val} onChange={(value) => { setValue(value) }} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={onSave} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
}
