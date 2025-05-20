import React, { useEffect, useState } from 'react';
import { getFormateurSessions } from '../../services/apiSession';
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import { Modal, Button } from 'antd';
import moment from "moment";
import "moment/locale/fr";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("fr");
const localizer = momentLocalizer(moment);

const FormateurCalendar = () => {
  const [events, setEvents] = useState([]);

useEffect(() => {
  const fetchSessions = async () => {
    try {
      const res = await getFormateurSessions();
      
      // 1. Added explicit check for empty data
      if (!res.data?.length) {
        console.warn("Aucune session reçue (même pas celles de l'admin)");
      }
      
      // 2. More detailed error logging
      setEvents(res.data.map(sess => ({
        id: sess._id,
        title: sess.titre,
        start: new Date(sess.date_debut),
        end: new Date(sess.date_fin),
      })));
    } catch (err) {
      // 3. Enhanced error details
      console.error("Détails de l'erreur :", {
        status: err.response?.status,
        data: err.response?.data
      });
    }
  };
  
  fetchSessions();
}, []);

  const startVideoConference = (session) => {
    console.log("Starting video conference for session:", session.id);
    window.open(`/video-conference/${session.id}`, '_blank');
  };

  const handleSelectEvent = (event) => {
    Modal.info({
      title: event.title,
      content: (
        <div>
          <p>Date: {moment(event.start).format('LLL')}</p>
          <p>Durée: {moment.duration(moment(event.end).diff(moment(event.start))).asMinutes()} minutes</p>
          <Button 
            type="primary" 
            onClick={() => startVideoConference(event)}
            className="mt-4"
          >
            Démarrer la vidéo-conférence
          </Button>
        </div>
      ),
    });
  };

  return (
    <div className="bg-lightBlue-200 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Votre emploi du temps</h2>
      <div style={{ height: "80vh" }}>
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%", width: "100%" }}
          onSelectEvent={handleSelectEvent}
          messages={{
            next: "Suivant",
            previous: "Précédent",
            today: "Aujourd'hui",
            month: "Mois",
            week: "Semaine",
            day: "Jour",
            agenda: "Agenda",
            date: "Date",
            time: "Heure",
            event: "Événement",
            showMore: (total) => `+ ${total} événements supplémentaires`,
          }}
        />
      </div>
    </div>
  );
};

export default FormateurCalendar;