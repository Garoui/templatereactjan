import React, { useState } from 'react';
import axios from 'axios';
import { ZoomMtg } from '@zoomus/websdk';

const VideoConference = () => {
  const [meetingConfig, setMeetingConfig] = useState({
    topic: '',
    startTime: '',
    duration: 60
  });

  const startMeeting = async () => {
    try {
      const response = await axios.post('/api/meetings', meetingConfig);
      const { signature, meetingNumber, password } = response.data;
      
      ZoomMtg.init({
        leaveUrl: window.location.origin,
        success: () => {
          ZoomMtg.join({
            signature,
            meetingNumber,
            userName: 'Formateur',
            apiKey: process.env.REACT_APP_ZOOM_API_KEY,
            userEmail: 'formateur@example.com',
            passWord: password,
            success: () => console.log('Meeting joined'),
            error: (err) => console.error(err)
          });
        }
      });
    } catch (error) {
      console.error('Error starting meeting:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Nouvelle Vidéoconférence</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Titre de la réunion *</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Introduction au Français"
            value={meetingConfig.topic}
            onChange={(e) => setMeetingConfig({...meetingConfig, topic: e.target.value})}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Date et heure *</label>
          <input
            type="datetime-local"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={meetingConfig.startTime}
            onChange={(e) => setMeetingConfig({...meetingConfig, startTime: e.target.value})}
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Durée (minutes) *</label>
          <input
            type="number"
            min="30"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={meetingConfig.duration}
            onChange={(e) => setMeetingConfig({...meetingConfig, duration: e.target.value})}
          />
        </div>
        
        <button
          onClick={startMeeting}
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Démarrer la Réunion
        </button>
      </div>
    </div>
  );
};

export default VideoConference;