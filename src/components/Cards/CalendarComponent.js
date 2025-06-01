import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import { Modal, Button, Spin, notification } from 'antd';
import moment from 'moment';
import SessionStatusBadge from '../../views/SessionStatusBadge';
import { getSessionStatus } from '../../utils/sessionStatus';
import JitsiMeetingWrapper  from './JitsiMeetingWrapper';

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

const CalendarComponent = ({ fetchSessions, role, currentUser }) => {
  const [state, setState] = useState({
    events: [],
    selectedSession: null,
    loading: true,
    jitsiModalVisible: false,
    isRecording: false,
    currentSession: null
  });

 
const handleJoinSession = (session) => {
  if (session.status === 'ONGOING') {
    setState({
      ...state,
      jitsiModalVisible: true,
      currentSession: session
    });
  }
};

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const response = await fetchSessions();
        if (!response.data) {
          throw new Error('No data received');
        }
        const sessions = Array.isArray(response) ? response : (response.data || []);
        
        const events = sessions.map(session => ({
          id: session._id,
          title: session.title,
          start: session.start,
          end: session.end,
          color: getStatusColor(session.status || getSessionStatus(session.start, session.end)),
          extendedProps: {
            formateurName: session.formateur ? 
              `${session.formateur.prenom} ${session.formateur.nom}` : 'Non assigné',
            status: session.status || getSessionStatus(session.start, session.end),
            jitsiRoom: session.jitsiRoom || `sesame-${session._id}`,
            description: session.description,
            type: session.type,
                canJoin: getSessionStatus(session.start, session.end) === 'ONGOING' // Simplified condition
 }
        }));

        setState({ ...state, events, loading: false });
      } catch (error) {
        console.error('Session loading error:', error);
        notification.error({
          message: 'Erreur',
          description: error.response?.data?.message || 
                     error.message || 
                     'Impossible de charger les sessions'
        });
        setState(prev => ({ 
          ...prev, 
          loading: false,
          events: [] 
        }));
      }
    };

    loadSessions();
  }, [role, fetchSessions]);

const handleEventClick = (info) => {
  console.log('Clicked session:', info.event.extendedProps);
  const session = {
    ...info.event,
    ...info.event.extendedProps,
    canJoin: info.event.extendedProps.status === 'ONGOING'
  };
  console.log('Processed session:', session);
  
  setState(prev => ({
    ...prev,
    selectedSession: session
  }));
};

  const startRecording = () => {
    setState(prev => ({ ...prev, isRecording: true }));
    notification.success({
      message: 'Enregistrement démarré',
      description: 'La session est maintenant enregistrée'
    });
  };

  const stopRecording = () => {
    setState(prev => ({ ...prev, isRecording: false }));
    notification.info({
      message: 'Enregistrement arrêté',
      description: 'La session a été enregistrée'
    });
  };

  return (
    <div className="relative md:pt-32 pb-32 pt-12">
      <div className="px-4 md:px-10 mx-auto w-full">
        {state.loading ? (
          <div className="text-center p-8">
            <Spin size="large" />
          </div>
        ) : (
          <div className="flex flex-wrap">
            <div className="w-full px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-blueGray-700">
                      {role === 'Apprenant' ? 'Votre Emploi du Temps' : 'Vos Sessions'}
                    </h3>
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
                    eventClick={handleEventClick}
                    height="auto"
                    eventContent={(eventInfo) => (
                      <div>
                        <b>{eventInfo.event.title}</b>
                        <div className="mt-1">
                          <SessionStatusBadge  
                            status={eventInfo.event.extendedProps?.status || 
                              getSessionStatus(eventInfo.event.start, eventInfo.event.end)}  
                          />
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

      {state.selectedSession && (
        <Modal
          title={
            <div className="flex justify-between items-center">
              <span>{state.selectedSession.title}</span>
              <SessionStatusBadge status={state.selectedSession.status} />
            </div>
          }
          open={true}
          onCancel={() => setState(prev => ({ ...prev, selectedSession: null }))}
          footer={[
            <Button key="back" onClick={() => setState(prev => ({ ...prev, selectedSession: null }))}>
              Fermer
            </Button>,
            state.selectedSession?.canJoin && (
              <>
                <Button 
                  type="primary" 
                  onClick={() => handleJoinSession(state.selectedSession)}
                  disabled={state.selectedSession.status !== 'ONGOING'}
                >
                  Rejoindre la Session
                </Button>
               {role === 'Formateur' && (
  <>
    <Button onClick={startRecording}>Démarrer Enregistrement</Button>
    <Button onClick={stopRecording}>Arrêter Enregistrement</Button>
  </>
)}
              </>
            )
          ]}
        >
          <div className="space-y-2">
            <p><strong>Formateur:</strong> {state.selectedSession.formateurName}</p>
            <p><strong>Date:</strong> {moment(state.selectedSession.start).format('dddd Do MMMM YYYY [à] HH:mm')}</p>
            <p><strong>Durée:</strong> {moment(state.selectedSession.end).diff(moment(state.selectedSession.start), 'minutes')} minutes</p>
            <p><strong>Type:</strong> {state.selectedSession.type === 'online' ? 'En ligne' : 'Présentiel'}</p>
            <p><strong>Description:</strong> {state.selectedSession.description || 'Aucune description'}</p>
          </div>
        </Modal>
      )}

      <JitsiMeetingWrapper
        roomName={state.currentSession?.jitsiRoom}
        visible={state.jitsiModalVisible}
        onClose={() => setState(prev => ({ ...prev, jitsiModalVisible: false }))}
        isRecording={state.isRecording}
        role={role}
        user={currentUser}
      />
    </div>
  );
};

export default CalendarComponent;