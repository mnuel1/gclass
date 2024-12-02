import React, { useEffect, useRef, useState } from "react";
import { Authentication } from "../../../Auth/Authentication";
import { useNavigate } from "react-router-dom";
import { FailedToast } from "../../../components/Toast/FailedToast";
import { SuccessToast } from "../../../components/Toast/SuccessToast";
import * as faceApi from "face-api.js";

export const StudentVideoConference: React.FC = () => {
  const { getID, getUser } = Authentication();

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const meetingName = localStorage.getItem("meetingName");
  const classId = localStorage.getItem("classId");
  const studentId = getID();
  const [counter, setCounter] = useState(0);
  const navigate = useNavigate();
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isWsOpen, setIsWsOpen] = useState(false);

  useEffect(() => {
    if (!studentId || !classId) {
      navigate("/");
    }

    const socket = new WebSocket(
      `wss://api.actsclassroom.online?role=student&classId=${classId}&studentId=${studentId}&studentName=${getUser()}`
    );

    setWs(socket);

    socket.addEventListener("open", () => {
      console.log("WebSocket connection established");
      setIsWsOpen(true);
    });

    socket.addEventListener("close", () => {
      console.log("WebSocket connection closed");
      setIsWsOpen(false);
    });

    socket.addEventListener("error", (error) => {
      console.error("WebSocket error:", error);
    });

    return () => {
      // socket.close();
    };
  }, [classId, studentId]);

  useEffect(() => {
    if (!getID()) {
      navigate("/teacher/login");
    }

    const handleIncrement = () => {
      setCounter((prevCount) => {
        if (prevCount === 3) {
          return 3;
        }
        const newCount = prevCount + 1;

        if (ws && isWsOpen && ws.readyState === WebSocket.OPEN) {
          console.log("Sending increment action");
          ws.send(JSON.stringify({ action: "increment" }));
        } else {
          console.log("WebSocket is not open. Ready state:", ws?.readyState);
        }

        return newCount;
      });
    };

    if (isWsOpen) {
      const jitsiScriptSource =
        "https://8x8.vc/vpaas-magic-cookie-e0064c22ac054806b66d689c7d3af0c6/external_api.js";

      const existingJitsiScript = document.querySelector(
        `script[src="${jitsiScriptSource}"]`
      );
      if (existingJitsiScript) return;

      const jitsiScript = document.createElement("script");
      jitsiScript.src = jitsiScriptSource;
      jitsiScript.async = true;
      document.body.appendChild(jitsiScript);

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

        api.addEventListener("videoConferenceJoined", async () => {
          if (videoRef.current) {
            const constraints = { video: { facingMode: "user" } };
            const stream = await navigator.mediaDevices.getUserMedia(
              constraints
            );
            videoRef.current.srcObject = stream;
            videoRef.current.play();

            const loadModels = async () => {
              await faceApi.loadSsdMobilenetv1Model("/models");
              await faceApi.loadFaceLandmarkModel("/models");
              await faceApi.loadFaceRecognitionModel("/models");
              console.log("Models loaded");
            };

            const detectFaces = async () => {
              if (videoRef.current) {
                const canvas = faceApi.createCanvasFromMedia(videoRef.current);
                document.body.append(canvas);
                faceApi.matchDimensions(canvas, videoRef.current);

                const detections = await faceApi
                  .detectAllFaces(
                    videoRef.current,
                    new faceApi.SsdMobilenetv1Options()
                  )
                  .withFaceLandmarks()
                  .withFaceDescriptors();

                if (counter !== 3) {
                  if (detections.length > 0) {
                    SuccessToast("You are present");
                  } else {
                    FailedToast("You are not present");
                    handleIncrement();
                  }
                }
              }
            };

            await loadModels();
            setInterval(detectFaces, 900000);
          }
        });

        api.addEventListener("videoConferenceLeft", () => {
          window.close();
        });
      };
      return () => {
        // Cleanup the script elements
        document.body.removeChild(jitsiScript);
      };
    }
  }, [isWsOpen]);

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      <div ref={containerRef} style={{ height: "100%", width: "100%" }}></div>
      <video ref={videoRef} style={{ display: "none" }} />
    </div>
  );
};
