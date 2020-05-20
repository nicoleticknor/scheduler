import React from "react";

import "components/DayListItem/DayListItem.scss";
const classnames = require('classnames');

export default function DayListItem(props) {

  //generate text for h3
  let spotsRemaining = props.spots;
  props.spots !== 1 ? spotsRemaining += ' spots remaining' :
    spotsRemaining += ' spot remaining';

  //generate className
  let full;
  props.spots === 0 ? full = true : full = false;
  const dayListClass = classnames({
    'day-list__item': true,
    'day-list__item--selected': props.selected,
    'day-list__item--full': full
  })

  return (
    <li
      data-testid="day"
      className={dayListClass}
      onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{spotsRemaining}</h3>
    </li>
  );
}
