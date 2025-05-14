/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import frLocale from '@fullcalendar/core/locales/fr';

import { Modal, Button, Form, Select, Input, TimePicker, DatePicker } from 'antd';
import moment from 'moment';
import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "components/Dropdowns/UserDropdown.js";
import { getAllFormateurs, getAllApprenants } from "../../services/apiUser";
import { createLiveSession } from "../../services/apiSession";

const { Option } = Select;
const { TextArea } = Input;

const CardCalendarAdmin = () => {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const [events, setEvents] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [formateurs, setFormateurs] = useState([]);
  const [apprenants, setApprenants] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetchFormateurs();
    fetchApprenants();
    fetchSessions();
  }, []);

  const fetchFormateurs = async () => {
    try {
      const res = await getAllFormateurs();
      console.log("Formateurs API response:", res.data); // Ajoute ce log
  
      // Vérifie que res.data est bien un tableau
      if (Array.isArray(res.data)) {
        setFormateurs(res.data);
      } else {
        console.error("Données inattendues pour les formateurs:", res.data);
        setFormateurs([]); // Met un tableau vide pour éviter le crash
      }
    } catch (error) {
      console.error("Error fetching formateurs:", error);
      setFormateurs([]); // En cas d’erreur, évite aussi le crash
    }
  };
  

  const fetchApprenants = async () => {
    try {
      const res = await getAllApprenants();
      console.log("Apprenants API response:", res.data); // Ajoutez ce log
      
      // Vérifiez que res.data est bien un tableau
      if (Array.isArray(res.data)) {
        setApprenants(res.data);
      } else if (res.data && Array.isArray(res.data.apprenantList)) {
        // Si les données sont dans une propriété apprenantList
        setApprenants(res.data.apprenantList);
      } else {
        console.error("Format inattendu pour les apprenants:", res.data);
        setApprenants([]); // Met un tableau vide pour éviter le crash
      }
    } catch (error) {
      console.error("Error fetching apprenants:", error);
      setApprenants([]); // En cas d'erreur, évite aussi le crash
    }
  };

  const fetchSessions = async () => {
    // This would be your API call to get all sessions
    // For demo purposes, we'll use mock data
    const mockSessions = [
      {
        id: 1,
        title: "Français Débutant",
        start: "2023-06-15T10:00:00",
        end: "2023-06-15T11:30:00",
        formateurId: 1,
        apprenantIds: [1, 2],
        type: "online",
        description: "Introduction à la grammaire française"
      },
      // Add more mock sessions as needed
    ];
    setEvents(mockSessions);
  };

  const handleDateClick = (arg) => {
    setSelectedDate(arg.date);
    setVisible(true);
  };

  const handleEventClick = (info) => {
    Modal.info({
      title: info.event.title,
      content: (
        <div>
          <p><strong>Formateur:</strong> {info.event.extendedProps.formateurName}</p>
          <p><strong>Apprenants:</strong> {info.event.extendedProps.apprenantNames.join(', ')}</p>
          <p><strong>Type:</strong> {info.event.extendedProps.type === 'online' ? 'En ligne' : 'Présentiel'}</p>
          <p><strong>Description:</strong> {info.event.extendedProps.description}</p>
        </div>
      ),
    });
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      // Vérification des données
      if (!formateurs || !apprenants) {
        throw new Error("Données des formateurs ou apprenants manquantes");
      }
  
      const formateur = formateurs.find(f => f._id === values.formateur);
      if (!formateur) {
        throw new Error("Formateur non trouvé");
      }
  
      const sessionData = {
        // ... vos champs existants
      };
  
      const res = await createLiveSession(sessionData);
      
      // Vérification de la réponse
      if (!res.data || !res.data._id) {
        throw new Error("Réponse invalide du serveur");
      }
  
      // ... reste du code
    } catch (error) {
      console.error("Error creating session:", error);
      Modal.error({
        title: 'Erreur',
        content: error.message || "Échec de la création de session",
      });
    }
  };

  return (
    <>
      {/* Sidebar - Same as previous examples */}
      

      {/* Main Content */}
      
        {/* Top Navigation */}
        <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
          <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
            <h2 className="text-blue text-sm uppercase hidden lg:inline-block font-semibold">
              Calendrier des Sessions
            </h2>
            <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
              <UserDropdown />
            </ul>
          </div>
        </nav>

        {/* Calendar Content */}
        <div className="relative bg-blueGray-100 md:pt-32 pb-32 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <div className="flex flex-wrap">
              <div className="w-full px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                  <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap  items-center">
                      <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h3 className="font-semibold text-base text-blueGray-700 ">
                          Gestion des Sessions
                        </h3>
                      </div>
                      <div className="relative w-full px-4 max-w-full  flex-grow flex-1 text-right">
                        <button
                 className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-3 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                          onClick={() => setVisible(true)}
                        >
                          Ajouter une Session
                        </button>
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
                      nowIndicator={true}
                      editable={true}
                      selectable={true}
                      selectMirror={true}
                      dayMaxEvents={true}
                      weekends={true}
                      dateClick={handleDateClick}
                      eventClick={handleEventClick}
                      height="auto"
                      eventContent={(eventInfo) => (
                        <div>
                          <b>{eventInfo.timeText}</b>
                          <i>{eventInfo.event.title}</i>
                        </div>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
     

      {/* Add Session Modal */}
      <Modal
        title="Ajouter une Nouvelle Session"
        visible={visible}
        onOk={handleSubmit}
        onCancel={() => {
          setVisible(false);
          form.resetFields();
        }}
        width={700}
        footer={[
          <Button key="back" onClick={() => setVisible(false)}>
            Annuler
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Créer la Session
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            type: 'online',
          }}
        >
          <Form.Item
            name="title"
            label="Titre de la Session"
            rules={[{ required: true, message: 'Veuillez entrer un titre' }]}
          >
            <Input placeholder="Ex: Introduction au Français" />
          </Form.Item>

          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: 'Veuillez sélectionner une date' }]}
          >
            <DatePicker 
              style={{ width: '100%' }} 
              disabledDate={(current) => current && current < moment().startOf('day')}
            />
          </Form.Item>

          <Form.Item
            name="time"
            label="Heure de début et fin"
            rules={[{ required: true, message: 'Veuillez sélectionner une plage horaire' }]}
          >
            <TimePicker.RangePicker 
              style={{ width: '100%' }}
              format="HH:mm"
              minuteStep={15}
            />
          </Form.Item>

          <Form.Item
            name="formateur"
            label="Formateur"
            rules={[{ required: true, message: 'Veuillez sélectionner un formateur' }]}
          >
            <Select placeholder="Sélectionnez un formateur">
              {formateurs && formateurs.map(formateur => (
                <Option key={formateur._id} value={formateur._id}>
                  {formateur.nom} {formateur.prenom}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="apprenants"
            label="Apprenants"
            rules={[{ required: true, message: 'Veuillez sélectionner au moins un apprenant' }]}
          >
          
<Select 
  mode="multiple"
  placeholder="Sélectionnez les apprenants"
>
  {Array.isArray(apprenants) && apprenants.map(apprenant => (
    <Option key={apprenant._id} value={apprenant._id}>
      {apprenant.nom} {apprenant.prenom}
    </Option>
  ))}
</Select>
          </Form.Item>

          <Form.Item
            name="type"
            label="Type de Session"
            rules={[{ required: true, message: 'Veuillez sélectionner un type' }]}
          >
            <Select>
              <Option value="online">En ligne</Option>
              <Option value="presentiel">Présentiel</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
          >
            <TextArea rows={4} placeholder="Description de la session (optionnel)" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CardCalendarAdmin;