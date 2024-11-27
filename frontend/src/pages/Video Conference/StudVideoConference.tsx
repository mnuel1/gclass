// import React, { useEffect, useRef, useState } from 'react';
// import { Authentication } from '../../Auth/Authentication';
// import { useNavigate } from 'react-router-dom';
// import * as XLSX from 'xlsx';
// import { FailedToast } from '../../components/Toast/FailedToast';
// import { SuccessToast } from '../../components/Toast/SuccessToast';
// import * as faceApi from 'face-api.js';
// // import MODEL from '../../../public/models/face_landmark_68_model-weights_manifest.json'
// interface Participant {
//   id: string;
//   name: string;
//   joined_time: Date;
//   leave_time: Date | null;
// }

// export const VideoConference: React.FC = () => {
//   const { getID } = Authentication()
//   const [participants, setParticipants] = useState<Participant[]>([]);
//   const participantsRef = useRef<Participant[]>([]);

//   const containerRef = useRef<HTMLDivElement>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const meetingName = localStorage.getItem('meetingName');
//   const classId = localStorage.getItem('classId');
//   const navigate = useNavigate()
//   const [ws, setWs] = useState<WebSocket | null>(null);
//   const [isWsOpen, setIsWsOpen] = useState(false);

//   useEffect(() => {
//     // Connect to WebSocket server as a teacher
//     const socket = new WebSocket(`ws://localhost:4000?role=teacher&classId=${classId}`);
//     setWs(socket);
//     socket.onopen = () => {
//       console.log('WebSocket connected as teacher');
//       setIsWsOpen(true);
//     };

//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       if (data.type === 'absence_alert') {
//         FailedToast(data.message);
        
//       }
//     };

//     socket.onclose = () => {
//       console.log('WebSocket disconnected');
//       setIsWsOpen(true);
//     };

 

//     return () => {
//       // socket.close();
//     };
//   }, [classId]);

//   useEffect(() => {

//     if(!getID()) {
//       navigate("/teacher/login")
//     }
      
//     // Load Jitsi Meet API script
//     const jitsiScript = document.createElement('script');
//     jitsiScript.src = 'https://8x8.vc/vpaas-magic-cookie-e0064c22ac054806b66d689c7d3af0c6/external_api.js';
//     jitsiScript.async = true;
//     document.body.appendChild(jitsiScript);

//     if (isWsOpen) {

    
//       jitsiScript.onload = () => {
//         const api = new (window as any).JitsiMeetExternalAPI("8x8.vc", {
//           roomName: `vpaas-magic-cookie-e0064c22ac054806b66d689c7d3af0c6/${meetingName}`,
//           parentNode: containerRef.current!,
//           configOverwrite: {            
//             disableInviteFunctions: true,
//           },
//           interfaceConfigOverwrite: {            
//             DISABLE_INVITE: true,            
//             TOOLBAR_BUTTONS: [
//               'microphone', 'camera', 'chat', 'desktop', 'fullscreen', 'hangup', 'profile', 'recording', 'settings',
//               'videoquality', 'stats', 'shortcuts', 'tileview', 'select-background', 'mute-everyone', 'mute-video-everyone'
//             ],
//           },
          
//         });

//         api.addEventListener('participantJoined', (participant: any) => {              
//           console.log(participant);
                                    
//           const newParticipant: Participant = {
//             id: participant.id,
//             name: participant.displayName || 'Anonymous',
//             joined_time: new Date(),
//             leave_time: null,
//           };
//           console.log(newParticipant);
//           setParticipants((prevParticipants) => {
//             const updatedParticipants = [...prevParticipants, newParticipant];
//             participantsRef.current = updatedParticipants; // Update the ref
//             return updatedParticipants;
//           });
//           console.log(participant);
//         });

//         api.addEventListener('participantLeft', (participant: any) => {
//           setParticipants((prevParticipants) => {
//             const updatedParticipants = prevParticipants.map((p) =>
//               p.id === participant.id ? { ...p, leave_time: new Date() } : p
//             );
//             participantsRef.current = updatedParticipants; // Update the ref
//             return updatedParticipants;
//           });
//         });

//         api.addEventListener('videoConferenceLeft', () => {
          
//           const participantsList = participantsRef.current; // Use the ref to get the latest participants

//           const worksheet = XLSX.utils.json_to_sheet(
//             participantsList.map((p) => ({
//               ID: p.id,
//               Name: p.name,
//               JoinedTime: p.joined_time.toISOString(),
//               LeaveTime: p.leave_time ? p.leave_time.toISOString() : 'Still in the meeting',
//             }))
//           );

//           const workbook = XLSX.utils.book_new();
//           XLSX.utils.book_append_sheet(workbook, worksheet, 'Participants');

//           XLSX.writeFile(workbook, `${meetingName}-${new Date().toISOString()}.xlsx`);

//           // Close the tab after the meeting ends
//           // window.close();
//         });

//         api.addEventListener('videoConferenceJoined', async () => {
        
//           if (videoRef.current) {
//             const constraints = { video: { facingMode: 'user' } };
//             const stream = await navigator.mediaDevices.getUserMedia(constraints);
//             videoRef.current.srcObject = stream;
//             videoRef.current.play();

//             // // Function to load face-api.js models
//             // const loadModels = async () => {         
//             //   await faceApi.loadSsdMobilenetv1Model('/models')
//             //   await faceApi.loadFaceLandmarkModel('/models')
//             //   await faceApi.loadFaceRecognitionModel('/models')
//             //   console.log("Models loaded");
//             // };

//             // // Function to detect faces
//             // const detectFaces = async () => {
//             //   if (videoRef.current) {
//             //     const canvas = faceApi.createCanvasFromMedia(videoRef.current);
//             //     document.body.append(canvas);
//             //     faceApi.matchDimensions(canvas, videoRef.current);

//             //     const detections = await faceApi.detectAllFaces(videoRef.current, new faceApi.SsdMobilenetv1Options())
//             //       .withFaceLandmarks().withFaceDescriptors();                                          

//             //     if (detections.length > 0) {
//             //       SuccessToast("Student is present")
//             //     } else {
//             //       FailedToast("Student is not present")
//             //     }
//             //   }
//             // };

//             // await loadModels();
//             // setInterval(detectFaces, 5000);
//           }
//         });
//       };

//       return () => {
//         // Cleanup the script elements
//         // document.body.removeChild(faceApiScript);
//         document.body.removeChild(jitsiScript);
//       };
//     }
//   }, [isWsOpen]);

//   return (
//     <div style={{ height: '100vh', width: '100vw', position: 'relative'}} className=''>
//       <div ref={containerRef} style={{ height: '100%', width: '100%' }}></div>
//       <video ref={videoRef} style={{ display: 'none' }} />    
//     </div>
    
//   );
// };

import React, { useState, useEffect, useRef } from 'react';
import './App.css';

type Message = {
  type: string;
  payload: any;
};

type User = {
  userId: number;
  userName: string;
  video: boolean;
  audio: boolean;
};

const App: React.FC = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [roomId, setRoomId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState<string>('');
  
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRefs = useRef<{ [key: string]: HTMLVideoElement }>({});
  
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [peerConnections, setPeerConnections] = useState<{ [key: string]: RTCPeerConnection }>({});
  const [isInRoom, setIsInRoom] = useState<boolean>(false); // State to track if the user has joined the room

  useEffect(() => {
    // Scroll to the latest message
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  const connectWebSocket = () => {
    const ws = new WebSocket('ws://localhost:3001'); // Replace with your backend URL if needed

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const data: Message = JSON.parse(event.data);
      console.log('Received:', data);

      switch (data.type) {
        case 'FE-user-join':
          setUsers(data.payload);
          break;
        case 'FE-receive-message':
          setMessages((prev) => [...prev, `${data.payload.sender}: ${data.payload.msg}`]);
          break;
        case 'FE-user-leave':
          setUsers((prev) => prev.filter((user) => user.userId !== data.payload.userId));
          break;
        case 'FE-toggle-camera':
          setUsers((prev) =>
            prev.map((user) =>
              user.userId === data.payload.userId
                ? { ...user, [data.payload.switchTarget]: !user[data.payload.switchTarget] }
                : user
            )
          );
          break;
        case 'FE-receive-call':
          handleReceiveCall(data.payload);
          break;
        case 'FE-call-accepted':
          handleCallAccepted(data.payload);
          break;
        default:
          break;
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setSocket(null);
    };

    return ws;
  };

  const joinRoom = () => {
    if (!socket || !roomId || !userName) return;

    // Send join room request to the WebSocket server
    socket.send(JSON.stringify({ type: 'BE-join-room', payload: { roomId, userName } }));
    setIsInRoom(true); // Mark as joined the room
  };

  const sendMessage = () => {
    if (!socket || !message) return;
    socket.send(JSON.stringify({ type: 'BE-send-message', payload: { roomId, msg: message, sender: userName } }));
    setMessage('');
  };

  const toggleCameraAudio = (switchTarget: 'video' | 'audio') => {
    if (!socket || !localStream) return;
    socket.send(JSON.stringify({ type: 'BE-toggle-camera-audio', payload: { roomId, switchTarget } }));
    const track = localStream.getTracks().find((track) => track.kind === switchTarget);
    if (track) {
      track.enabled = !track.enabled;
    }
  };

  const startLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
    } catch (err) {
      console.error('Error accessing media devices:', err);
    }
  };

  const handleReceiveCall = (payload: any) => {
    const { signal, from, info } = payload;

    const pc = createPeerConnection(from);
    pc.setRemoteDescription(new RTCSessionDescription(signal));

    // Create an answer and send it back
    pc.createAnswer()
      .then((answer) => {
        pc.setLocalDescription(answer);
        socket?.send(
          JSON.stringify({ type: 'BE-accept-call', payload: { signal: answer, to: from } })
        );
      })
      .catch((error) => console.log('Error creating answer:', error));
  };

  const handleCallAccepted = (payload: any) => {
    const { signal, answerId } = payload;

    const pc = peerConnections[answerId];
    pc.setRemoteDescription(new RTCSessionDescription(signal));
  };

  const createPeerConnection = (userId: string) => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });

    // Add the local stream to the peer connection
    if (localStream) {
      localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
    }

    // Handle ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket?.send(
          JSON.stringify({
            type: 'BE-call-user',
            payload: {
              userToCall: userId,
              from: userName,
              signal: { candidate: event.candidate },
            },
          })
        );
      }
    };

    // Handle receiving remote stream
    pc.ontrack = (event) => {
      if (event.streams && event.streams[0]) {
        const remoteStream = event.streams[0];
        const remoteVideo = document.createElement('video');
        remoteVideo.srcObject = remoteStream;
        remoteVideo.play();
        remoteVideo.setAttribute('id', userId);
        document.getElementById('remote-videos')?.appendChild(remoteVideo);
      }
    };

    setPeerConnections((prev) => ({ ...prev, [userId]: pc }));

    return pc;
  };

  const connectToPeer = (userId: string) => {
    const pc = createPeerConnection(userId);

    // Create an offer
    pc.createOffer()
      .then((offer) => {
        pc.setLocalDescription(offer);
        socket?.send(
          JSON.stringify({ type: 'BE-call-user', payload: { userToCall: userId, from: userName, signal: offer } })
        );
      })
      .catch((error) => console.error('Error creating offer:', error));
  };

  // Auto connect WebSocket on page load
  useEffect(() => {
    const ws = connectWebSocket();
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="App">
      <h1>WebSocket Video Chat</h1>

      {!isInRoom ? (
        // Show Room ID and Username inputs
        <div>
          <input
            type="text"
            placeholder="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button onClick={joinRoom}>Join Room</button>
        </div>
      ) : (
        <div>
          <div>
            <button onClick={startLocalStream}>Start Video</button>
          </div>

          <div>
            <h2>Your Video:</h2>
            <video ref={localVideoRef} autoPlay muted></video>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h2>Users in Room:</h2>
            <ul>
              {users.map((user) => (
                <li key={user.userId}>
                  {user.userName} - Video: {user.video ? 'On' : 'Off'} - Audio: {user.audio ? 'On' : 'Off'}
                  <button onClick={() => connectToPeer(user.userId.toString())}>Call</button>
                </li>
              ))}
            </ul>
          </div>

          <div id="remote-videos" style={{ marginTop: '20px' }}>
            <h2>Remote Videos:</h2>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h2>Messages:</h2>
            <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
              {messages.map((msg, idx) => (
                <p key={idx}>{msg}</p>
              ))}
              <div ref={messageEndRef}></div>
            </div>
            <input
              type="text"
              placeholder="Type your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
          </div>

          <div style={{ marginTop: '20px' }}>
            <button onClick={() => toggleCameraAudio('video')}>Toggle Video</button>
            <button onClick={() => toggleCameraAudio('audio')}>Toggle Audio</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
