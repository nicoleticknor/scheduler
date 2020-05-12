import React from "react";

import "components/DayListItem/DayListItem.scss";
const classNames = require('classnames');

export default function DayListItem(props) {
  let dayClass = "day-list"
  let spotsRemaining = ''

  if (props.selected) {
    dayClass += "__item--selected";
  }

  if (props.spots === 0) {
    dayClass += "__item--full";
    spotsRemaining = 'no spots remaining';
  } else if (props.spots === 1) {
    spotsRemaining = props.spots + ' spot remaining';
  } else {
    spotsRemaining = props.spots + ' spots remaining';
  }

  if (!props.selected && props.spots !== 0) {
    dayClass += "__item";
  }

  return (
    <li className={dayClass} onClick={() => { props.handleSetDay(props.name) }}>
      <h2 className={dayClass}>{props.name}</h2>
      <h3 className={dayClass}>{spotsRemaining}</h3>
    </li>
  );
}
