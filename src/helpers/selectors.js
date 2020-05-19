//these are called a selector because it accepts state as an argument and returns data derived from that state

module.exports = {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
}

function getAppointmentsForDay(state, day) {
  const dayObj = state.days.find(d => d.name === day);

  //some validation for if the day has no appointments
  if (dayObj === undefined) {
    return [];
  }
  const appts = dayObj.appointments.reduce((acc, a) => {
    for (const item in state.appointments) {
      if (a === Number(item)) {
        acc.push(state.appointments[item]);
      }
    }
    return acc;
  }, []);

  return appts;
}

function getInterview(state, interview) {

  if (!interview) return null;

  const interviewerId = interview.interviewer;
  const interviewersAry = Object.values(state.interviewers)

  return { "student": interview.student, "interviewer": interviewersAry.find(i => i.id === interviewerId) }
}

function getInterviewersForDay(state, day) {
  const dayObj = state.days.find(d => d.name === day);

  if (dayObj === undefined) {
    return [];
  }

  const interviewers = dayObj.interviewers.reduce((acc, i) => {
    for (const item in state.interviewers) {
      if (i === Number(item)) {
        acc.push(state.interviewers[item]);
      }
    }
    return acc;
  }, []);

  return interviewers;
}


