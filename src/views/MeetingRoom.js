import React, { useEffect } from "react";
import { useHMSActions, HMSRoomProvider } from "@100mslive/react-sdk";
import { useParams } from "react-router-dom";
import MeetingUI from "../components/Meetings/meetingUi"

const JoinRoom = ({ token }) => {
  const hmsActions = useHMSActions();

  useEffect(() => {
    hmsActions.join({
      userName: "Guest User", // or get from auth
      authToken: token,
    });
  }, [token, hmsActions]);

  return <MeetingUI />;
};

const MeetingRoom = () => {
  const { roomId } = useParams(); // passed in the URL like /meeting/:roomId
  const [token, setToken] = React.useState(null);

  useEffect(() => {
    // Fetch token from your backend
    fetch("http://localhost:5000/api/meetings/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roomId,
        userId: "frontend_user_id", // ideally from auth
        role: "host",
      }),
    })
      .then(res => res.json())
      .then(data => setToken(data.token));
  }, [roomId]);

  if (!token) return <div>Loading...</div>;

  return (
    <HMSRoomProvider>
      <JoinRoom token={token} />
    </HMSRoomProvider>
  );
};

export default MeetingRoom;
