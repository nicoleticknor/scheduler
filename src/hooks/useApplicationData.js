import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {

  useEffect(() => {
    async function apiRequest() {
      try {
        const p1 = await axios.get('http://localhost:8001/api/days');
        const p2 = await axios.get('http://localhost:8001/api/appointments');
        const p3 = await axios.get('http://localhost:8001/api/interviewers');

        setState(prev => {
          return { ...prev, days: p1.data, appointments: p2.data, interviewers: p3.data }
        })
      }
      catch (err) {
        axios.get('http://localhost:8001/api/debug/reset')
      }
    }

    apiRequest();
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

    const index = state.days.findIndex(d => state.days.name === today.name)

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
