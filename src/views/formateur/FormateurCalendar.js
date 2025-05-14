import React, { useEffect, useState } from 'react';
import { getFormateurSessions } from '../../services/apiSession';
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/fr"; // Français
moment.locale("fr");
const localizer = momentLocalizer(moment);

const FormateurCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await getFormateurSessions();
        const formatted = res.data.map(sess => ({
          title: sess.titre,
          start: sess.date_debut,
          end: sess.date_fin
        }));
        setEvents(formatted);
      } catch (err) {
        console.error("Erreur chargement des sessions", err);
      }
    };
    fetchSessions();
  }, []);

  return (
    <div className="bg-lightBlue-200  rounded-lg shadow-md p-6">
  <h2 className="text-2xl font-bold text-center mb-6">Votre emploi du temps</h2>
        <div style={{ height: "80vh" }}>
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%", width: "100%" }}
           
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
