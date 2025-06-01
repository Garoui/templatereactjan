import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import { Modal, Form, Button, Spin, notification } from 'antd';
import moment from 'moment';
import { getSessions, createSession, updateSession, deleteSession } from "../../services/apiSession";
import SessionModal from '../../views/SessionModal';
import { getAllUsers } from "../../services/apiUser";
import SessionStatusBadge from '../../views/SessionStatusBadge';
import { getSessionStatus } from '../../utils/sessionStatus';

export const getStatusColor = (status) => {
  const statusUpper = status?.toUpperCase();
  switch(statusUpper) {
    case 'UPCOMING': return '#3b82f6'; // blue
    case 'ONGOING': return '#10b981'; // green
    case 'COMPLETED': return '#6b7280'; // gray
    case 'CANCELLED': return '#ef4444'; // red
    case 'SCHEDULED': return '#8b5cf6'; // purple
    default: return '#3b82f6'; // default blue
  }
};
const CardCalendarAdmin = () => {
  const [state, setState] = useState({
    events: [],
    formateurs: [],
    apprenants: [],
    selectedSession: null,
    loading: {
      sessions: false,
      formateurs: false,
      apprenants: false
    },
    modalVisible: false,
    selectedDate: null
  });

  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setState(prev => ({ ...prev, loading: { sessions: true, formateurs: true, apprenants: true } }));
      
      const [formateursRes, apprenantsRes, sessionsRes] = await Promise.all([
        getAllUsers("Formateur"),
        getAllUsers("Apprenant"),
        getSessions()
      ]);

      const formateursData = Array.isArray(formateursRes.data) 
        ? formateursRes.data 
        : formateursRes.data?.data || formateursRes.data?.formateurListe || [];
      
      const apprenantsData = Array.isArray(apprenantsRes.data) 
        ? apprenantsRes.data 
        : apprenantsRes.data?.data || apprenantsRes.data?.apprenantListe || [];

      const events = sessionsRes.data.map(session => ({
        id: session._id,
        title: session.title,
        start: session.start,
        end: session.end,
          color: getStatusColor(session.status || getSessionStatus(session.start, session.end)),

        extendedProps: {
          formateurId: session.formateur?._id,
          formateurName: session.formateur ? 
            `${session.formateur.prenom} ${session.formateur.nom}` : 'Non assigné',
          apprenantIds: session.apprenants?.map(a => a._id) || [],
          apprenantNames: session.apprenants?.length > 0 ?
            session.apprenants.map(a => `${a.prenom} ${a.nom}`).join(', ') :
            'Aucun',
          type: session.type,
          description: session.description,
          jitsiRoom: session.jitsiRoom || `sesame-${session._id}`,
          status: getSessionStatus(session.start, session.end)
        }
      }));

      setState(prev => ({
        ...prev,
        events,
        formateurs: formateursData,
        apprenants: apprenantsData,
        loading: { sessions: false, formateurs: false, apprenants: false }
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      notification.error({
        message: 'Erreur',
        description: 'Impossible de charger les données'
      });
      setState(prev => ({ ...prev, loading: { sessions: false, formateurs: false, apprenants: false } }));
    }
  };

  const handleEditSession = (sessionId) => {
    const session = state.events.find(e => e.id === sessionId);
    setState(prev => ({ ...prev, selectedSession: session }));
    form.setFieldsValue({
      title: session.title,
      formateur: session.extendedProps.formateurId,
      apprenants: session.extendedProps.apprenantIds,
      type: session.extendedProps.type,
      description: session.extendedProps.description,
      date: moment(session.start),
      time: [moment(session.start), moment(session.end)]
    });
    setState(prev => ({ ...prev, modalVisible: true }));
  };

  const handleDeleteSession = async (sessionId) => {
    Modal.confirm({
      title: 'Confirmer la suppression',
      content: 'Êtes-vous sûr de vouloir supprimer cette session?',
      onOk: async () => {
        try {
          await deleteSession(sessionId);
          await fetchData();
          notification.success({
            message: 'Succès',
            description: 'Session supprimée avec succès'
          });
        } catch (error) {
          notification.error({
            message: 'Erreur',
            description: 'Échec de la suppression de la session'
          });
        }
      }
    });
  };

  const handleDateClick = (arg) => {
    // Store the clicked date
    setState(prev => ({ 
      ...prev, 
      selectedSession: null, 
      modalVisible: true,
      selectedDate: arg.date 
    }));
    form.resetFields();
    
    // If a date was clicked, set it in the form
    if (arg.date) {
      form.setFieldsValue({
        date: moment(arg.date)
      });
    }
  };

  const handleEventClick = (info) => {
    const session = state.events.find(e => e.id === info.event.id);
    
    Modal.info({
      title: (
        <div className="flex justify-between items-center">
          <span>{info.event.title}</span>
          <SessionStatusBadge status={info.event.extendedProps.status} />
        </div>
      ),
      content: (
        <div>
          <p><strong>Formateur:</strong> {info.event.extendedProps.formateurName}</p>
          <p><strong>Apprenants:</strong> {info.event.extendedProps.apprenantNames || 'Aucun'}</p>
          <p><strong>Type:</strong> {info.event.extendedProps.type === 'online' ? 'En ligne' : 'Présentiel'}</p>
          <p><strong>Description:</strong> {info.event.extendedProps.description || 'Aucune'}</p>
          <div className="mt-4 flex justify-between">
            <Button onClick={() => handleEditSession(info.event.id)}>Modifier</Button>
            <Button 
              danger 
              onClick={() => handleDeleteSession(info.event.id)}
              className="ml-2"
            >
              Supprimer
            </Button>
          </div>
        </div>
      ),
      width: 600
    });
  };

  const handleSubmit = async (formValues) => {
    try {
      if (!formValues.date || !formValues.time) {
        notification.error({
          message: 'Erreur',
          description: 'Veuillez sélectionner une date et une heure'
        });
        return;
      }

      // Use the selected date from the calendar if available
      const dateToUse = state.selectedDate ? moment(state.selectedDate) : moment(formValues.date);
      
      const startMoment = dateToUse
        .clone()
        .hour(formValues.time[0].hour())
        .minute(formValues.time[0].minute())
        .second(0);

      const endMoment = dateToUse
        .clone()
        .hour(formValues.time[1].hour())
        .minute(formValues.time[1].minute())
        .second(0);

      if (endMoment.isSameOrBefore(startMoment)) {
        notification.error({
          message: 'Erreur',
          description: "L'heure de fin doit être après l'heure de début"
        });
        return;
      }

      const sessionData = {
        title: formValues.title,
        start: startMoment.toISOString(),
        end: endMoment.toISOString(),
        formateur: formValues.formateur,
        apprenants: formValues.apprenants,
        type: formValues.type,
        description: formValues.description,
         jitsiRoom: `sesame-${Date.now()}`
      };

      if (state.selectedSession) {
        await updateSession(state.selectedSession.id, sessionData);
      } else {
        await createSession(sessionData);
      }

      notification.success({ 
        message: 'Succès', 
        description: 'Session enregistrée avec succès' 
      });
      await fetchData();
      setState(prev => ({ ...prev, modalVisible: false, selectedDate: null }));
    } catch (error) {
      console.error('Error saving session:', error);
      notification.error({
        message: 'Erreur',
        description: error.response?.data?.message || "Échec de l'enregistrement de la session"
      });
    }
  };

  return (
    <div className="relative md:pt-32 pb-32 pt-12">
      <div className="px-4 md:px-10 mx-auto w-full">
        {state.loading.sessions ? (
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
                          setState(prev => ({ ...prev, selectedSession: null, modalVisible: true, selectedDate: null }));
                          form.resetFields();
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
                    events={state.events}
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
                    eventContent={(eventInfo) => (
                      <div>
                        <b>{eventInfo.event.title}</b>
                        <div className="mt-1">
                          <SessionStatusBadge status={eventInfo.event.extendedProps.status} />
                        </div>
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <SessionModal
        open={state.modalVisible}
        onCancel={() => {
          setState(prev => ({ ...prev, modalVisible: false, selectedDate: null }));
          form.resetFields();
        }}
        onFinish={handleSubmit}
        form={form}
        formateurs={state.formateurs}
        apprenants={state.apprenants}
        initialValues={state.selectedSession}
        loading={state.loading.formateurs || state.loading.apprenants}
      />
    </div>
  );
};

export default CardCalendarAdmin;