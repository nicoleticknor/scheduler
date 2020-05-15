import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {

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

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return (
      axios
        .delete(`http://localhost:8001/api/appointments/${id}`)
        .then(() => {
          setState(state => { return { ...state, appointments: appointments } })
        })
    )
  }


  return { state, setDay, bookInterview, cancelInterview }
}
