"use client"

import { useEffect, useState, useRef } from "react"
import {
  useHMSActions,
  useHMSStore,
  selectPeers,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
  selectVideoTrackByID,
  selectRoomState,
  selectLocalPeer,
} from "@100mslive/react-sdk"
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react"

const VideoTile = ({ peer }) => {
  const hmsActions = useHMSActions()
  const videoTrack = useHMSStore(selectVideoTrackByID(peer.videoTrack))
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current && videoTrack?.enabled) {
      hmsActions.attachVideo(videoTrack.id, videoRef.current)
    }
    return () => {
      if (videoRef.current && videoTrack?.enabled) {
        hmsActions.detachVideo(videoTrack.id, videoRef.current)
      }
    }
  }, [videoTrack, hmsActions])

  return (
    <div className="bg-black rounded-lg overflow-hidden aspect-video max-h-60">
      {videoTrack?.enabled ? (
        <video ref={videoRef} autoPlay muted={peer.isLocal} playsInline className="w-[200px] h-[100px]" />
      ) : (
        <div className="flex items-center justify-center  text-white bg-gray-800">
          {peer.name || "Unknown"}
        </div>
      )}
    </div>
  )
}

const MeetingUI = () => {
  const peers = useHMSStore(selectPeers)
  const isAudioOn = useHMSStore(selectIsLocalAudioEnabled)
  const isVideoOn = useHMSStore(selectIsLocalVideoEnabled)
  const roomState = useHMSStore(selectRoomState)
  const hmsActions = useHMSActions()
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setTimer((t) => t + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  const toggleAudio = () => hmsActions.setLocalAudioEnabled(!isAudioOn)
  const toggleVideo = () => hmsActions.setLocalVideoEnabled(!isVideoOn)
  const leaveRoom = () => {
    hmsActions.leave()
    window.location.href = "/"
  }

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  if (roomState !== "Connected") {
    return <div className="h-screen flex justify-center items-center text-gray-600">Connecting...</div>
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Meeting</h1>
        <span className="text-sm">Time: {formatTime(timer)}</span>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {peers.map((peer) => (
          <VideoTile key={peer.id} peer={peer} />
        ))}
      </div>

      <footer className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 bg-gray-800 px-6 py-3 rounded-xl shadow-lg">
        <button
          onClick={toggleAudio}
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isAudioOn ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {isAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
        </button>
        <button
          onClick={toggleVideo}
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isVideoOn ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
        </button>
        <button
          onClick={leaveRoom}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-red-700"
        >
          <PhoneOff className="w-5 h-5" />
        </button>
      </footer>
    </div>
  )
}

export default MeetingUI
