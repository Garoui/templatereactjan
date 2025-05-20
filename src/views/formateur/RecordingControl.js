import React, { useState, useEffect, useRef } from 'react';
import { Video, X, Clock } from 'react-feather';

const RecordingControl = ({ sessionData, onClose }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [savedRecordings, setSavedRecordings] = useState([]);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    
    // Start timer
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    
    // Here you would implement actual recording start logic
  };

  const stopRecording = () => {
    setIsRecording(false);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Add to saved recordings
    const newRecording = {
      id: Date.now(),
      name: `Enregistrement - ${new Date().toLocaleString()}`,
      duration: recordingTime,
      sessionTitle: sessionData.title,
      date: new Date().toISOString()
    };
    
    setSavedRecordings(prev => [...prev, newRecording]);
    
    // Here you would implement actual recording stop logic
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const downloadRecording = (recordingId) => {
    // Here you would implement actual download logic
    console.log(`Downloading recording ${recordingId}`);
    alert("Téléchargement de l'enregistrement démarré.");
  };

  const deleteRecording = (recordingId) => {
    setSavedRecordings(prev => prev.filter(rec => rec.id !== recordingId));
    // Here you would implement actual deletion logic
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-bold">Contrôle d'Enregistrement</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Session: {sessionData.title}</h3>
            
            <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
              <div className="flex items-center">
                <Video size={24} className="text-red-600 mr-2" />
                <div>
                  {isRecording ? (
                    <div className="flex items-center">
                      <span className="animate-pulse text-red-600 mr-2">●</span>
                      <span>Enregistrement en cours</span>
                    </div>
                  ) : (
                    <span>Prêt à enregistrer</span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center">
                {isRecording && (
                  <div className="flex items-center mr-4">
                    <Clock size={18} className="mr-1" />
                    <span>{formatTime(recordingTime)}</span>
                  </div>
                )}
                
                {isRecording ? (
                  <button 
                    onClick={stopRecording}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Arrêter
                  </button>
                ) : (
                  <button 
                    onClick={startRecording}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Démarrer l'enregistrement
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Enregistrements Sauvegardés</h3>
            
            {savedRecordings.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Aucun enregistrement sauvegardé</p>
            ) : (
              <div className="border rounded-lg divide-y">
                {savedRecordings.map(recording => (
                  <div key={recording.id} className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{recording.name}</h4>
                      <p className="text-sm text-gray-500">
                        Durée: {formatTime(recording.duration)} | 
                        {new Date(recording.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => downloadRecording(recording.id)}
                        className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                      >
                        Télécharger
                      </button>
                      <button 
                        onClick={() => deleteRecording(recording.id)}
                        className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="border-t p-4 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordingControl;