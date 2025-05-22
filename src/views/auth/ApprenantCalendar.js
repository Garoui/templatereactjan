import React, { useState, useEffect } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/fr";
import { getApprenantSessions } from "../../services/apiSession";
import { useHistory } from 'react-router-dom';

moment.locale("fr");
const localizer = momentLocalizer(moment);

const ApprenantCalendar = ({ userId }) => {  // Using userId from props
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lessons, setLessons] = useState([
    {
      id: 1,
      title: "React",
      tutor: "Marie Dupont",
      date: new Date(2025, 4, 15, 14, 0),
      duration: 60,
    },
    {
      id: 2,
      title: "node",
      tutor: "John Smith",
      date: new Date(2025, 4, 18, 10, 30),
      duration: 45,
    },
  ]);
  const [error, setError] = useState(null);

  const history = useHistory();

  const events = lessons.map((lesson) => ({
    id: lesson.id,
    title: `${lesson.title} - ${lesson.tutor}`,
    start: lesson.date,
    end: new Date(lesson.date.getTime() + lesson.duration * 60000),
    lesson,
  }));

  const handleSelectEvent = (event) => {
    setSelectedLesson(event.lesson);
  };

  const closeModal = () => {
    setSelectedLesson(null);
  };

  const joinVideoConference = (sessionId) => {
    closeModal();
    history.push(`/video-conference/${sessionId}`);
  };

  const isSessionActive = (lesson) => {
    const now = new Date();
    const startTime = new Date(lesson.date);
    const endTime = new Date(startTime.getTime() + lesson.duration * 60000);
    return now >= new Date(startTime.getTime() - 15 * 60000) && now <= endTime;
  };

  useEffect(() => {
    const fetchApprenantSessions = async () => {
      try {
        setLoading(true);
        if (userId) {  // Using userId from props instead of useAuth
          const res = await getApprenantSessions(userId);  // Pass userId to API call
          setLessons(res.data);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching sessions:", err);
        setError("Failed to load sessions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchApprenantSessions();
  }, [userId]);  // Add userId to dependency array

  return (
    <div className="bg-lightBlue-200 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Votre emploi du temps</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
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
      )}

      {selectedLesson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">{selectedLesson.title}</h3>
            <p className="text-gray-700 mb-2">
              <strong>Avec :</strong> {selectedLesson.tutor}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Date :</strong> {moment(selectedLesson.date).format("dddd DD MMMM YYYY à HH:mm")}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Durée :</strong> {selectedLesson.duration} minutes
            </p>
            
            <div className="flex justify-between mt-6">
              {isSessionActive(selectedLesson) && (
                <button
                  onClick={() => joinVideoConference(selectedLesson.id)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Rejoindre la vidéo-conférence
                </button>
              )}
              
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprenantCalendar;