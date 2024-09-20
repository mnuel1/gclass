import React, { useEffect, useRef, useState } from 'react';
import { Authentication } from '../../Auth/Authentication';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { FailedToast } from '../../components/Toast/FailedToast';
import { SuccessToast } from '../../components/Toast/SuccessToast';
import * as faceApi from 'face-api.js';
import MODEL from '../../../public/models/face_landmark_68_model-weights_manifest.json'
interface Participant {
  id: string;
  name: string;
  joined_time: Date;
  leave_time: Date | null;
}

export const VideoConference: React.FC = () => {
  const { getID } = Authentication()
  const [participants, setParticipants] = useState<Participant[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const meetingName = localStorage.getItem('meetingName');
  const navigate = useNavigate()
  useEffect(() => {

    if(!getID()) {
      navigate("/teacher/login")
    }
      
    // Load Jitsi Meet API script
    const jitsiScript = document.createElement('script');
    jitsiScript.src = 'https://8x8.vc/vpaas-magic-cookie-e0064c22ac054806b66d689c7d3af0c6/external_api.js';
    jitsiScript.async = true;
    document.body.appendChild(jitsiScript);

    jitsiScript.onload = () => {
      const api = new (window as any).JitsiMeetExternalAPI("8x8.vc", {
        roomName: `vpaas-magic-cookie-e0064c22ac054806b66d689c7d3af0c6/${meetingName}`,
        parentNode: containerRef.current!,
      });

      api.addEventListener('participantJoined', (participant: any) => {
        const newParticipant: Participant = {
          id: participant.id,
          name: participant.displayName || 'Anonymous',
          joined_time: new Date(),
          leave_time: null,
        };
        setParticipants((prevParticipants) => [...prevParticipants, newParticipant]);
      });

      api.addEventListener('participantLeft', (participant: any) => {
        setParticipants((prevParticipants) =>
          prevParticipants.map(p => 
            p.id === participant.id 
              ? { ...p, leave_time: new Date() } 
              : p
          )
        );
      });

      api.addEventListener('videoConferenceLeft', () => {
        
        // Create Excel file on meeting end
        const worksheet = XLSX.utils.json_to_sheet(participants.map(p => ({
          ID: p.id,
          Name: p.name,
          JoinedTime: p.joined_time.toISOString(),
          LeaveTime: p.leave_time ? p.leave_time.toISOString() : 'Still in the meeting',
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Participants');
        
        // Generate file
        XLSX.writeFile(workbook, `${meetingName}-${new Date()}.xlsx`);
        
        
        // Close the tab after the meeting ends
        window.close();
      });

      api.addEventListener('videoConferenceJoined', async () => {
       
        if (videoRef.current) {
          const constraints = { video: { facingMode: 'user' } };
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          videoRef.current.srcObject = stream;
          videoRef.current.play();

          // Function to load face-api.js models
          const loadModels = async () => {         
            await faceApi.loadSsdMobilenetv1Model('/models')
            await faceApi.loadFaceLandmarkModel('/models')
            await faceApi.loadFaceRecognitionModel('/models')
            console.log("Models loaded");
          };

          // Function to detect faces
          const detectFaces = async () => {
            if (videoRef.current) {
              const canvas = faceApi.createCanvasFromMedia(videoRef.current);
              document.body.append(canvas);
              faceApi.matchDimensions(canvas, videoRef.current);

              const detections = await faceApi.detectAllFaces(videoRef.current, new faceApi.SsdMobilenetv1Options())
                .withFaceLandmarks().withFaceDescriptors();                                          

              if (detections.length > 0) {
                SuccessToast("Student is present")
              } else {
                FailedToast("Student is not present")
              }
            }
          };

          await loadModels();
          setInterval(detectFaces, 5000);
        }
      });
    };

    return () => {
      // Cleanup the script elements
      // document.body.removeChild(faceApiScript);
      document.body.removeChild(jitsiScript);
    };
  }, []);

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative'}} className=''>
      <div ref={containerRef} style={{ height: '100%', width: '100%' }}></div>
      <video ref={videoRef} style={{ display: 'none' }} />    
    </div>
  );
};
