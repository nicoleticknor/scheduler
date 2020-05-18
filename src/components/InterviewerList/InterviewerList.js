import React from "react";
import "components/InterviewerList/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem/InterviewerListItem";
import PropTypes from 'prop-types';

export default function DayList({ interviewers, value, onChange }) {

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers.map(i => {
        return (
          <InterviewerListItem
            key={i.id}
            name={i.name}
            avatar={i.avatar}
            selected={i.id === value}
            setInterviewer={(event) => onChange(i.id)} />
        )
      })

      }</ul>
    </section>
  )
}

