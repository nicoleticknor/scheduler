import React from "react";

import "components/InterviewerListItem/InterviewerListItem.scss";

export default function InterviewerListItem(props) {

  //generage className
  let interviewerClass;
  props.selected ? interviewerClass = 'interviewers__item--selected' :
    interviewerClass = 'interviewers__item'

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}

