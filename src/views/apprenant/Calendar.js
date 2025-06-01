import React from 'react';
import CalendarComponent from '../../components/Cards/CalendarComponent';
import { getApprenantSessions } from '../../services/apiSession';

const Calendar = () => {
  return (
   <CalendarComponent
  fetchSessions= {getApprenantSessions}
  role="Apprenant"
 
/>
  );
};

export default Calendar;