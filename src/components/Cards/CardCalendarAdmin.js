import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import { Modal, Form, Button, Spin } from 'antd';
import moment from 'moment';
import { getSessions, createSession, updateSession, deleteSession } from "../../services/apiSession";
import SessionModal from '../../views/SessionModal';
import { getAllUsers } from "../../services/apiUser";

const CardCalendarAdmin = () => {
  const [events, setEvents] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [formateurs, setFormateurs] = useState([]);
  const [apprenants, setApprenants] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [loading, setLoading] = useState({
    formateurs: false,
    apprenants: false,
    sessions: false
  });

useEffect(() => {
  let isMounted = true;

  const fetchData = async () => {
    try {
      setLoading({ formateurs: true, apprenants: true, sessions: true });
      
      const [formateursRes, apprenantsRes, sessionsRes] = await Promise.all([
        getAllUsers("Formateur"),
        getAllUsers("Apprenant"),
        getSessions()
      ]);

      if (isMounted) {
        setFormateurs(formateursRes.data?.formateurListe || []);
        setApprenants(apprenantsRes.data?.apprenantListe || []);
        
        const formatted = sessionsRes.data.map(session => ({
          id: session._id,
          title: session.title,
          start: session.start,
          end: session.end,
          formateurId: session.formateur?._id,
          formateurName: session.formateur ? 
            `${session.formateur.prenom} ${session.formateur.nom}` : 'Non assigné',
          apprenantIds: session.apprenants?.map(a => a._id) || [],
          apprenantNames: session.apprenants?.length > 0 ?
            session.apprenants.map(a => `${a.prenom} ${a.nom}`).join(', ') :
            'Aucun',
          type: session.type,
          description: session.description
        }));
        
        setEvents(formatted);
      }
    } catch (error) {
      if (isMounted) {
        console.error("Error fetching data:", error);
      }
    } finally {
      if (isMounted) {
        setLoading({ formateurs: false, apprenants: false, sessions: false });
      }
    }
  };

  fetchData();

  return () => {
    isMounted = false;
  };
}, []);

  const handleEditSession = (sessionId) => {
    const session = events.find(e => e.id === sessionId);
    setSelectedSession(session);
    form.setFieldsValue({
      title: session.title,
      formateur: session.formateurId,
      apprenants: session.apprenantIds,
      type: session.type,
      description: session.description,
      date: moment(session.start),
      time: [moment(session.start), moment(session.end)]
    });
    setVisible(true);
  };

  const handleDeleteSession = async (sessionId) => {
    Modal.confirm({
      title: 'Confirmer la suppression',
      content: 'Êtes-vous sûr de vouloir supprimer cette session?',
      onOk: async () => {
        try {
          await deleteSession(sessionId);
          fetchSessions();
        } catch (error) {
          console.error("Error deleting session:", error);
        }
      }
    });
  };

  

  const fetchSessions = async () => {
    try {
      const res = await getSessions();
      const formatted = res.data.map(session => ({
        id: session._id,
        title: session.title,
        start: session.start,
        end: session.end,
        formateurId: session.formateur,
        apprenantIds: session.apprenants,
        type: session.type,
        description: session.description,
        extendedProps: {
          formateurName: session.formateurName,
          apprenantNames: session.apprenantNames
        }
      }));
      setEvents(formatted);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      setEvents([]);
    }
  };

  const handleDateClick = (arg) => {
    setSelectedSession(null);
    form.resetFields();
    setVisible(true);
  };

  const handleEventClick = (info) => {
    Modal.info({
      title: info.event.title,
      content: (
        <div>
          <p><strong>Formateur:</strong> {info.event.extendedProps.formateurName}</p>
          <p><strong>Apprenants:</strong> {info.event.extendedProps.apprenantNames || 'Aucun'}</p>
          <p><strong>Type:</strong> {info.event.extendedProps.type === 'online' ? 'En ligne' : 'Présentiel'}</p>
          <p><strong>Description:</strong> {info.event.extendedProps.description || 'Aucune'}</p>
          <div className="mt-4">
            <Button onClick={() => handleEditSession(info.event.id)}>Modifier</Button>
            <Button danger onClick={() => handleDeleteSession(info.event.id)} className="ml-2">
              Supprimer
            </Button>
          </div>
        </div>
      ),
    });
  };

 const handleSubmit = async (values) => {
  try {
    // Properly combine date and time
    const start = moment(values.date)
      .set({
        hour: values.time[0].hour(),
        minute: values.time[0].minute()
      });
    const end = moment(values.date)
      .set({
        hour: values.time[1].hour(),
        minute: values.time[1].minute()
      });

    const sessionData = {
      title: values.title,
      start: start.toISOString(),
      end: end.toISOString(),
      formateur: values.formateur,
      apprenants: values.apprenants,
      type: values.type,
      description: values.description
    };

    if (selectedSession) {
      await updateSession(selectedSession.id, sessionData);
    } else {
      await createSession(sessionData);
    }
    
    await fetchSessions();
    setVisible(false);
    form.resetFields();
  } catch (error) {
    console.error("Error saving session:", error);
    if (error.response?.data?.code === "DUPLICATE_TITLE") {
      Modal.error({
        title: 'Titre déjà utilisé',
        width: 600,
        content: (
          <div>
            <p style={{ marginBottom: 16 }}>{error.response.data.message}</p>
            <h4>Suggestions :</h4>
            <ul style={{ marginBottom: 16 }}>
              {(error.response.data.suggestions || []).map((suggestion, i) => (
                <li key={i}>{suggestion}</li>
              ))}
            </ul>
            <Button 
              type="primary" 
              onClick={() => {
                const newTitle = `${values.title} - ${moment().format('DD/MM')}`;
                form.setFieldsValue({ title: newTitle });
                Modal.destroyAll();
              }}
            >
              Utiliser un titre avec date
            </Button>
          </div>
        ),
      });
    } else {
      Modal.error({
        title: 'Erreur',
        content: error.response?.data?.message || "Échec de l'enregistrement",
      });
    }
  }
};

  return (
    <div className="relative bg-blueGray-100 md:pt-32 pb-32 pt-12">
      <div className="px-4 md:px-10 mx-auto w-full">
        {loading.sessions ? (
          <div className="text-center p-8">
            <Spin size="large" />
          </div>
        ) : (
        <div className="flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-blueGray-700">
                      Gestion des Sessions
                    </h3>
                  </div>
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                    <Button
                      type="primary"
                      onClick={() => {
                        setSelectedSession(null);
                        setVisible(true);
                      }}
                    >
                      Ajouter une Session
                    </Button>
                  </div>
                </div>
              </div>
              <div className="block w-full overflow-x-auto p-6">
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  initialView="timeGridWeek"
                  headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                  }}
                  events={events}
                  locale={frLocale}
                  nowIndicator
                  editable
                  selectable
                  selectMirror
                  dayMaxEvents
                  weekends
                  dateClick={handleDateClick}
                  eventClick={handleEventClick}
                  height="auto"
                />
              </div>
            </div>
          </div>
        </div>
        )}
      </div>

       <SessionModal
        open={visible}
        onCancel={() => {
          setVisible(false);
          form.resetFields();
        }}
        onFinish={handleSubmit}
        form={form}
        formateurs={formateurs}
        apprenants={apprenants}
        initialValues={selectedSession}
        loading={loading.formateurs || loading.apprenants}
      />
    </div>
  );
};

export default CardCalendarAdmin;