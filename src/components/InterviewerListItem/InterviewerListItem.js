import React from "react";

import "components/InterviewerListItem/InterviewerListItem.scss";

export default function InterviewerListItem({ name, avatar, selected, setInterviewer }) {

  let interviewerClass = "interviewers__item"

  if (selected) {
    interviewerClass += "--selected";
  }

  return (
    <li className={interviewerClass} onClick={setInterviewer}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
}

