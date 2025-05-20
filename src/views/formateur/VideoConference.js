import React, { useState, useEffect, useRef } from 'react';
import DailyIframe from '@daily-co/daily-js';
import { Video, X, Share2, Mic, MicOff, Camera, CameraOff, Phone } from 'react-feather';

const VideoConference = ({ sessionId, userData, onClose }) => {
  const callFrameRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const callFrame = DailyIframe.createFrame({
      url: `https://your-domain.daily.co/${sessionId}`,
      showLeaveButton: false,
      iframeStyle: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        border: '0'
      },
      customTrayButtons: {
        helpButton: {
          iconPath: '/help-icon.svg',
          label: 'Aide',
          action: () => window.open('/support')
        }
      }
    });

    callFrame.on('loading', () => setIsLoading(true))
             .on('loaded', () => setIsLoading(false))
             .on('joined-meeting', () => setIsConnected(true))
             .on('error', (e) => setError(e));

    callFrame.join({
      userName: `${userData.name} (${userData.role})`,
      userData: {
        id: userData.id,
        role: userData.role,
        canWhiteboard: userData.role === 'teacher'
      }
    });

    callFrameRef.current = callFrame;

    return () => {
      callFrame.leave();
    };
  }, [sessionId]);

  const toggleMute = () => {
    if (callFrameRef.current) {
      callFrameRef.current.setLocalAudio(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  const toggleCamera = () => {
    if (callFrameRef.current) {
      callFrameRef.current.setLocalVideo(!isCameraOff);
      setIsCameraOff(!isCameraOff);
    }
  };

  const toggleScreenShare = async () => {
    if (callFrameRef.current) {
      if (isScreenSharing) {
        await callFrameRef.current.stopScreenShare();
      } else {
        await callFrameRef.current.startScreenShare();
      }
      setIsScreenSharing(!isScreenSharing);
    }
  };

  const endCall = () => {
    if (callFrameRef.current) {
      callFrameRef.current.leave();
    }
    onClose();
  };

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-lg w-full">
          <h2 className="text-xl font-bold mb-4">Erreur de connexion</h2>
          <p>{error.message || 'Impossible de se connecter à la session'}</p>
          <button 
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Fermer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col z-50">
      {/* Header */}
      <div className="bg-gray-900 p-4 flex justify-between items-center">
        <div className="text-white font-bold">
          Session: {sessionId}
        </div>
        <div className="flex items-center space-x-4">
          {isConnected && (
            <div className="text-green-500 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Connecté
            </div>
          )}
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-300"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Daily.co iframe */}
      <div ref={callFrameRef} style={{ flex: 1 }} />

      {/* Controls */}
      <div className="bg-gray-900 p-4 flex justify-center space-x-6">
        <button 
          onClick={toggleMute}
          className={`p-3 rounded-full ${isMuted ? 'bg-red-600' : 'bg-gray-700'} text-white`}
          title={isMuted ? 'Activer le micro' : 'Désactiver le micro'}
        >
          {isMuted ? <MicOff /> : <Mic />}
        </button>
        <button 
          onClick={toggleCamera}
          className={`p-3 rounded-full ${isCameraOff ? 'bg-red-600' : 'bg-gray-700'} text-white`}
          title={isCameraOff ? 'Activer la caméra' : 'Désactiver la caméra'}
        >
          {isCameraOff ? <CameraOff /> : <Camera />}
        </button>
        <button 
          onClick={toggleScreenShare}
          className={`p-3 rounded-full ${isScreenSharing ? 'bg-green-600' : 'bg-gray-700'} text-white`}
          title={isScreenSharing ? 'Arrêter le partage' : 'Partager l\'écran'}
        >
          <Share2 />
        </button>
        <button 
          onClick={endCall}
          className="p-3 rounded-full bg-red-600 text-white"
          title="Quitter l'appel"
        >
          <Phone />
        </button>
      </div>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="text-center text-white">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-4"></div>
            <p>Connexion à la session vidéo...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoConference;