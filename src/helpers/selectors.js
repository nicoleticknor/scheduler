//these are called a selector because it accepts state as an argument and returns data derived from that state

export default function getAppointmentsForDay(state, day) {

  const dayObj = state.days.find(d => d.name === day);
  // console.log(dayObj);

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
