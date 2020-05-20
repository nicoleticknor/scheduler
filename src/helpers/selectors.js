//these are called a selector because it accepts state as an argument and returns data derived from that state

module.exports = {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
  changeAppointmentsState,
  changeDayState
}

//local helper
function getToday(state, day) {
  return state.days.find(d => d.name === day);
}

function getAppointmentsForDay(state, day) {

  const today = getToday(state, day);

  //to allow .map on days with no appointments
  if (!today) return [];

  //select only appointments for today
  const todaysAppts = today.appointments.reduce((acc, a) => {
    for (const item in state.appointments) {
      if (a === Number(item)) {
        acc.push(state.appointments[item]);
      }
    }
    return acc;
  }, []);
  return todaysAppts;
}

function getInterviewersForDay(state, day) {

  const today = getToday(state, day);

  //to allow .map on days with no interviewers
  if (!today) return [];

  const todaysInterviewers = today.interviewers.reduce((acc, i) => {
    for (const item in state.interviewers) {
      if (i === Number(item)) {
        acc.push(state.interviewers[item]);
      }
    }
    return acc;
  }, []);

  return todaysInterviewers;
}

function getInterview(state, interview) {
  if (!interview) return null;

  const interviewersAry = Object.values(state.interviewers)
  return { "student": interview.student, "interviewer": interviewersAry.find(i => i.id === interview.interviewer) }
}

function changeDayState(appointments, state) {

  const today = getToday(state, state.day);
  const days = [...state.days];
  //find today's index in state
  const index = state.days.findIndex(d => state.days.name === today.name)

  //calculate remaining spots for today
  const spotsRemaining = today.appointments.reduce((acc, d) => {
    if (!appointments[d].interview) acc++
    return acc;
  }, 0);

  //update spots in state at toda's index only
  today.spots = spotsRemaining;
  days[index] = today;

  return days;
}

function changeAppointmentsState(id, interview, state) {

  const appointment = {
    ...state.appointments[id],
    interview: interview
  };

  return {
    ...state.appointments,
    [id]: appointment
  };
}
