import React, { useState, useEffect } from "react";
import useApplicationData from "../hooks/useApplicationData"

import "components/Application.scss";
import DayList from "components/DayList/DayList";
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors"

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const apptsForDay = getAppointmentsForDay(state, state.day);
  const interviewersForDay = getInterviewersForDay(state, state.day);

  const schedule = apptsForDay.map(appt => {
    const interview = getInterview(state, appt.interview);
    return <Appointment
      key={appt.id}
      id={appt.id}
      time={appt.time}
      interview={interview}
      interviewers={interviewersForDay}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />;
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            handleSetDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
