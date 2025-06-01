import React, { useEffect, useState } from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { Modal } from 'antd';

const JitsiMeetingWrapper = ({ 
  roomName, 
  visible, 
  onClose, 
  isRecording, 
  role,
  user 
}) => {
  const [api, setApi] = useState(null);

  // Handle recording based on role and state
  useEffect(() => {
    if (!api || role !== 'Formateur') return;

    if (isRecording) {
      api.executeCommand('startRecording', {
        mode: 'file',
        shouldShare: true
      });
    } else {
      api.executeCommand('stopRecording', {
        mode: 'file'
      });
    }
  }, [isRecording, api, role]);

  const handleJitsiIFrameRef = (iframeRef) => {
    iframeRef.style.height = '70vh';
    iframeRef.style.width = '100%';
  };

  const handleApiReady = (externalApi) => {
    setApi(externalApi);
    
    // Set user display name
    externalApi.executeCommand('displayName', `${user.prenom} ${user.nom}`);
    
    // For formateurs - enable recording capability
    if (role === 'Formateur') {
      externalApi.executeCommand('toggleLobby', false);
    }
  };

  if (!visible) return null;

  return (
    <Modal
      title={`Session Vidéo - ${roomName}`}
      open={visible}
      onCancel={onClose}
      footer={null}
      width="80%"
      destroyOnHidden
    >
      <JitsiMeeting
        roomName={roomName}
        configOverwrite={{
          startWithAudioMuted: false,
          startWithVideoMuted: false,
          disableSimulcast: false,
          enableRecording: role === 'Formateur',
          prejoinPageEnabled: false
        }}
        interfaceConfigOverwrite={{
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
          TOOLBAR_BUTTONS: [
            'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
            'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
            'livestreaming', 'settings', 'raisehand', 'videoquality', 'tileview',
            'security'
          ]
        }}
        getIFrameRef={handleJitsiIFrameRef}
        onApiReady={handleApiReady}
        userInfo={{
          displayName: `${user.prenom} ${user.nom}`,
          email: user.email
        }}
      />
    </Modal>
  );
};

export default JitsiMeetingWrapper;