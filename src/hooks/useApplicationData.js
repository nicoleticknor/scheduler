import { useState, useEffect } from 'react';
import { changeAppointmentsState, changeDayState } from '../helpers/selectors'
import axios from 'axios';

export default function useApplicationData() {

  //retrieve relevant application data from API on load
  useEffect(() => {

    async function apiRequest() {
      try {
        const days = await axios.get('http://localhost:8001/api/days');
        const appointments = await axios.get('http://localhost:8001/api/appointments');
        const interviewers = await axios.get('http://localhost:8001/api/interviewers');

        setState(prev => {
          return { ...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data }
        })
      }
      catch (err) {
        alert(err);
        console.log(err);
      }
    }
    apiRequest();

  }, []);

  //set state
  const setDay = day => setState({ ...state, day });
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  async function bookInterview(id, interview) {

    const appointments = changeAppointmentsState(id, { ...interview }, state);
    const days = changeDayState(appointments, state);

    await axios.put(`http://localhost:8001/api/appointments/${id}`, { interview });

    return setState(state => {
      return {
        ...state,
        appointments: appointments,
        days
      }
    })

  }

  async function cancelInterview(id) {

    const appointments = changeAppointmentsState(id, null, state);
    const days = changeDayState(appointments, state);

    await axios.delete(`http://localhost:8001/api/appointments/${id}`);
    return setState(state => {
      return {
        ...state,
        appointments: appointments,
        days
      }
    })
  }

  return { state, setDay, bookInterview, cancelInterview }
}
