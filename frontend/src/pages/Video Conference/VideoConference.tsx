// @ts-nocheck

import React, { useEffect, useRef, useState } from "react";
import { Authentication } from "../../Auth/Authentication";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { FailedToast } from "../../components/Toast/FailedToast";
// import { SuccessToast } from '../../components/Toast/SuccessToast';
// import * as faceApi from 'face-api.js';
// import MODEL from '../../../public/models/face_landmark_68_model-weights_manifest.json'
import moment from 'moment-timezone';
interface Participant {
  id: string;
  name: string;
  joined_time: Date;
  leave_time: Date | null;
}

export const VideoConference: React.FC = () => {
  const { getID } = Authentication();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const participantsRef = useRef<Participant[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const meetingName = localStorage.getItem("meetingName");
  const classId = localStorage.getItem("classId");
  const navigate = useNavigate();
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isWsOpen, setIsWsOpen] = useState(false);
  useEffect(() => {
    // Connect to WebSocket server as a teacher
    const socket = new WebSocket(
      `wss://api.actsclassroom.online?role=teacher&classId=${classId}`
    );
    setWs(socket);
    socket.onopen = () => {
      console.log("WebSocket connected as teacher");
      setIsWsOpen(true);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "absence_alert") {
        FailedToast(data.message);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
      setIsWsOpen(true);
    };

    return () => {
      // socket.close();
    };
  }, [classId]);

  useEffect(() => {
    if (!getID()) {
      navigate("/teacher/login");
    }


    // Load Jitsi Meet API script
    const jitsiScript = document.createElement("script");
    jitsiScript.src =
      "https://8x8.vc/vpaas-magic-cookie-e0064c22ac054806b66d689c7d3af0c6/external_api.js";
    jitsiScript.async = true;
    document.body.appendChild(jitsiScript);

    if (isWsOpen) {
      jitsiScript.onload = () => {
        const api = new (window as any).JitsiMeetExternalAPI("8x8.vc", {
          roomName: `vpaas-magic-cookie-e0064c22ac054806b66d689c7d3af0c6/${meetingName}`,
          parentNode: containerRef.current!,
          configOverwrite: {
            disableInviteFunctions: true,
          },
          interfaceConfigOverwrite: {
            DISABLE_INVITE: true,
            TOOLBAR_BUTTONS: [
              "microphone",
              "camera",
              "chat",
              "desktop",
              "fullscreen",
              "hangup",
              "profile",
              "recording",
              "settings",
              "videoquality",
              "stats",
              "shortcuts",
              "tileview",
              "select-background",
              "mute-everyone",
              "mute-video-everyone",
            ],
          },
        });

        api.addEventListener("participantJoined", (participant: any) => {
          //const joinedTime = new Date();
	  //const formattedDate = new Intl.DateTimeFormat('en-US', options).format(joinedTime);
          const newParticipant: Participant = {
            id: participant.id,
            name: participant.displayName || "Anonymous",
            joined_time: moment().tz('Asia/Singapore').format('YYYY-MM-DD HH:mm:ss'),
            leave_time: null,
          };
	console.log("new" + newParticipant)
          setParticipants((prevParticipants) => {
            const updatedParticipants = [...prevParticipants, newParticipant];
            participantsRef.current = updatedParticipants; // Update the ref
            return updatedParticipants;
          });
        });

        api.addEventListener("participantLeft", (participant: any) => {
          //const leaveTime = new Date();
	  //const formattedDate = new Intl.DateTimeFormat('en-US', options).format(leaveTime);

          setParticipants((prevParticipants) => {
            const updatedParticipants = prevParticipants.map((p) =>
              p.id === participant.id ? { ...p, leave_time: moment().tz('Asia/Singapore').format('YYYY-MM-DD HH:mm:ss')} : p
            );
            participantsRef.current = updatedParticipants; // Update the ref
            return updatedParticipants;
          });
        });

        api.addEventListener("videoConferenceLeft", () => {
          const participantsList = participantsRef.current; // Use the ref to get the latest participants

          const worksheet = XLSX.utils.json_to_sheet(
            participantsList.map((p) => ({
              Name: p.name,
              TimeIn: p.joined_time,
              TimeOut: p.leave_time
                ? p.leave_time
                : "Still in the meeting",
	      Status: "Present"
            }))
          );

          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "Participants");

          XLSX.writeFile(
            workbook,
            `${meetingName}-${new Date().toISOString()}.xlsx`
          );

          // Close the tab after the meeting ends
          // window.close();
        });

        api.addEventListener("videoConferenceJoined", async () => {
          if (videoRef.current) {
            const constraints = { video: { facingMode: "user" } };
            const stream = await navigator.mediaDevices.getUserMedia(
              constraints
            );
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          
          }
        });
      };

      return () => {
        // Cleanup the script elements
        // document.body.removeChild(faceApiScript);
        document.body.removeChild(jitsiScript);
      };
    }
  }, [isWsOpen]);

  return (
    <div
      style={{ height: "100vh", width: "100vw", position: "relative" }}
      className=""
    >
      <div ref={containerRef} style={{ height: "100%", width: "100%" }}></div>
      <video ref={videoRef} style={{ display: "none" }} />
    </div>
  );
};
