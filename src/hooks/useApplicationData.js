import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {

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
      .catch(() => axios.get('http://localhost:8001/api/debug/reset'))
  }, []);

  const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  function calculateSpots(appointments) {

    const today = state.days.find(d => d.name === state.day);

    const spotsRemaining = today.appointments.reduce((acc, d) => {
      if (!appointments[d].interview) {
        acc++;
      }
      return acc;
    }, 0);

    today.spots = spotsRemaining;

    let index;
    for (let i = 0; i < state.days.length; i++) {
      if (state.days[i].name === today.name) {
        index = i;
      }
    }

    const days = [...state.days];
    days[index] = today;

    return days;
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = calculateSpots(appointments);
    return (
      axios
        .put(`http://localhost:8001/api/appointments/${id}`, { interview })
        .then(() => {
          setState(state => {
            return {
              ...state,
              appointments: appointments,
              days
            }
          })
        })
    )
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = calculateSpots(appointments);

    return (
      axios
        .delete(`http://localhost:8001/api/appointments/${id}`)
        .then(() => {

          setState(state => { return { ...state, appointments: appointments, days } })
        })
    )
  }


  return { state, setDay, bookInterview, cancelInterview }
}
