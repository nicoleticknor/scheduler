import React from "react";

import "components/DayListItem.scss";
const classNames = require('classnames');

export default function DayListItem(props) {
  // const { name, spots, selected, setDay } = props;

  let dayClass = "day-list"

  if (props.selected) {
    dayClass += "__item--selected";
  }

  if (props.spots === 0) {
    dayClass += "__item--full";
  }

  if (!props.selected && props.spots !== 0) {
    dayClass += "__item";
  }

  return (
    <li className={dayClass} onClick={() => { props.setDay(props.name) }}>
      <h2 className={dayClass}>{props.name}</h2>
      <h3 className={dayClass}>{props.spots}</h3>
    </li>
  );
}
