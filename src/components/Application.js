import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "components/DayList/DayList";
import InterviewerList from "components/InterviewerList/InterviewerList";
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors"

export default function Application(props) {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    const p1 = axios.get('http://localhost:8001/api/days');
    const p2 = axios.get('http://localhost:8001/api/appointments');
    const p3 = axios.get('http://localhost:8001/api/interviewers');
    Promise.all([p1, p2, p3])
      .then((all) => {
        setState(prev => {
          return { ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }
        })
      })
  }, []);

  const apptsForDay = getAppointmentsForDay(state, state.day);
  const interviewersForDay = getInterviewersForDay(state, state.day);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return (
      axios
        .put(`http://localhost:8001/api/appointments/${id}`, { interview })
        .then(() => {
          setState(state => { return { ...state, appointments: appointments } })
        })
    )
  }

  const schedule = apptsForDay.map(appt => {
    const interview = getInterview(state, appt.interview);
    return <Appointment
      key={appt.id}
      id={appt.id}
      time={appt.time}
      interview={interview}
      interviewers={interviewersForDay}
      bookInterview={bookInterview}
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
