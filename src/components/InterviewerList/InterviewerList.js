import React from "react";
import "components/InterviewerList/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem/InterviewerListItem";
import PropTypes from 'prop-types';

export default function InterviewerList(props) {

  InterviewerList.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
  };

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{props.interviewers.map(i => {
        return (
          <InterviewerListItem
            key={i.id}
            name={i.name}
            avatar={i.avatar}
            selected={i.id === props.value}
            setInterviewer={(event) => props.onChange(i.id)} />
        )
      })
      }</ul>
    </section>
  )
}

