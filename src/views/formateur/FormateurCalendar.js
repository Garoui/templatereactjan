import React from 'react';
import CalendarComponent from '../../components/Cards/CalendarComponent';
import { getFormateurSessions } from '../../services/apiSession';

const FormateurCalendar = () => {
  return (
   <CalendarComponent 
  fetchSessions={getFormateurSessions} 
  role="Formateur" 
 
/>
  );
};

export default FormateurCalendar;