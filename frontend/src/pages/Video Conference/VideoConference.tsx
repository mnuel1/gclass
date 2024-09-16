import React, { useEffect, useRef, useState } from 'react';

export const VideoConference: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Load face-api.js script
    const faceApiScript = document.createElement('script');
    faceApiScript.src = '../scripts/face-api.js'; // Update this with the correct path to face-api.js
    faceApiScript.defer = true;
    document.body.appendChild(faceApiScript);

    // Load Jitsi Meet API script
    const jitsiScript = document.createElement('script');
    jitsiScript.src = 'https://8x8.vc/vpaas-magic-cookie-e0064c22ac054806b66d689c7d3af0c6/external_api.js';
    jitsiScript.async = true;
    document.body.appendChild(jitsiScript);

    jitsiScript.onload = () => {
      const api = new (window as any).JitsiMeetExternalAPI("8x8.vc", {
        roomName: "vpaas-magic-cookie-e0064c22ac054806b66d689c7d3af0c6/SampleAppValidActsCrashMagnificently",
        parentNode: containerRef.current!,
      });

      api.addEventListener('videoConferenceJoined', async () => {
        if (videoRef.current) {
          const constraints = { video: { facingMode: 'user' } };
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          videoRef.current.srcObject = stream;
          videoRef.current.play();

          // Function to load face-api.js models
          const loadModels = async () => {
            await (window as any).faceapi.loadFromUri('./models');
            await (window as any).faceapi.loadFromUri('./models');
            await (window as any).faceapi.loadFromUri('./models');
            console.log("Models loaded");
          };

          // Function to detect faces
          const detectFaces = async () => {
            if (videoRef.current) {
              const canvas = (window as any).faceapi.createCanvasFromMedia(videoRef.current);
              document.body.append(canvas);
              (window as any).faceapi.matchDimensions(canvas, videoRef.current);

              const detections = await (window as any).faceapi.detectAllFaces(videoRef.current, new (window as any).faceapi.SsdMobilenetv1Options())
                .withFaceLandmarks().withFaceDescriptors();

              const resizedResults = (window as any).faceapi.resizeResults(detections, { width: videoRef.current.width, height: videoRef.current.height });
              (window as any).faceapi.draw.drawDetections(canvas, resizedResults);
              (window as any).faceapi.draw.drawFaceLandmarks(canvas, resizedResults);

              if (detections.length > 0) {
                setModalVisible(true);
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
      document.body.removeChild(faceApiScript);
      document.body.removeChild(jitsiScript);
    };
  }, []);

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <div ref={containerRef} style={{ height: '100%', width: '100%' }}></div>
      <video ref={videoRef} style={{ display: 'none' }} />
      {modalVisible && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          background: 'white',
          border: '1px solid black',
          zIndex: 1000
        }}>
          <h2>Face Detected</h2>
          <button onClick={() => setModalVisible(false)}>Close</button>
        </div>
      )}
    </div>
  );
};
