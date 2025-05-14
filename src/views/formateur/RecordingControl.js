import React, { useState } from 'react';
import axios from 'axios';

const RecordingControl = ({ meetingId }) => {
  const [isRecording, setIsRecording] = useState(false);
  
  const toggleRecording = async () => {
    try {
      if (isRecording) {
        await axios.post('/api/recordings/stop', { meetingId });
      } else {
        await axios.post('/api/recordings/start', { meetingId });
      }
      setIsRecording(!isRecording);
    } catch (error) {
      console.error('Error controlling recording:', error);
    }
  };

  return (
    <div className="fixed bottom-6 right-6">
      <button 
        onClick={toggleRecording}
        className={`flex items-center px-4 py-2 rounded-full shadow-lg font-semibold transition-all ${
          isRecording 
            ? 'bg-red-600 text-white hover:bg-red-700' 
            : 'bg-green-600 text-white hover:bg-green-700'
        }`}
      >
        {isRecording ? (
          <>
            <span className="w-3 h-3 bg-white rounded-full mr-2 animate-pulse"></span>
            Arrêter l'enregistrement
          </>
        ) : (
          'Démarrer l\'enregistrement'
        )}
      </button>
    </div>
  );
};

export default RecordingControl;