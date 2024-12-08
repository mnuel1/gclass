// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import Peer from 'simple-peer';
import socket from '../../socket';
import { useParams, useNavigate } from 'react-router-dom';
import VideoCard from '../Video/VideoCard';
import BottomBar from '../BottomBar/BottomBar';
import Chat from '../Chat/Chat';
//import Participants from '../Participants/Participants';
import { FailedToast } from '../../components/Toast/FailedToast';
import { SuccessToast } from '../../components/Toast/SuccessToast';
import * as faceApi from 'face-api.js';
const Room = () => {

  const currentUser = sessionStorage.getItem('user');
  const role = sessionStorage.getItem('role');
    
  const [peers, setPeers] = useState([]);
  const [userVideoAudio, setUserVideoAudio] = useState({
    localUser: { video: true, audio: true },
  });
  const [videoDevices, setVideoDevices] = useState([]);
  const [displayChat, setDisplayChat] = useState(false);
  const [displayParticipant, setDisplayParticipant] = useState(false);
  const [screenShare, setScreenShare] = useState(false);
  const [showVideoDevices, setShowVideoDevices] = useState(false);
  const peersRef = useRef([]);
  const userVideoRef = useRef();
  const screenTrackRef = useRef();
  const userStream = useRef();
  const { roomId } = useParams<{ roomId?: string }>();
  const navigate = useNavigate()
  
  const counter = useRef(0)
  useEffect(() => {  
    if (!roomId || !currentUser) {
      navigate('/room');
    }
    
  }, [roomId, navigate]);

  
  useEffect(() => {

    // send signal to socket for increment counter
    const handleIncrement = () => {  
      
      if (counter.current === 3) return;
      
      counter.current += 1;
      socket.emit('BE-student-increment', { roomId });
      
    };
    if (role === "teacher") {      
      socket.on('FE-teacher-notify', (data) => {                
        FailedToast(data.msg);
      })
    }
    
    // Get Video Devices
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const filtered = devices.filter((device) => device.kind === 'videoinput');
      setVideoDevices(filtered);
    });

    // Set Back Button Event
    window.addEventListener('popstate', goToBack);

    // Connect Camera & Mic
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideoRef.current.srcObject = stream;
        userStream.current = stream;

        socket.emit('BE-join-room', { roomId, userName: currentUser, role: role });
        socket.on('FE-user-join', (users) => {
          // all users
          const peersJoined : any = [];
                    
          users.forEach(({ userId, info }) => {
            let { userName, video, audio } = info;
            
            if (userName !== currentUser) {
              const peer = createPeer(userId, socket.id, stream);

              peer.userName = userName;
              peer.peerID = userId;
              
              peersRef.current.push({
                peerID: userId,
                peer,
                userName,
              });
              
              
              peersJoined.push(peer);

                            
              setUserVideoAudio((preList) => {
                return {
                  ...preList,
                  [peer.userName]: { video, audio },
                };
              });
            }
          });          
          setPeers(peers);
          
          
        });

        socket.on('FE-receive-call', ({ signal, from, info }) => {
          let { userName, video, audio } = info;
          const peerIdx = findPeer(from);

          if (!peerIdx) {
            const peer = addPeer(signal, from, stream);

            peer.userName = userName;

            peersRef.current.push({
              peerID: from,
              peer,
              userName: userName,
            });
            setPeers((users) => {
              return [...users, peer];
            });
            setUserVideoAudio((preList) => {
              return {
                ...preList,
                [peer.userName]: { video, audio },
              };
            });
          }
        });

        socket.on('FE-call-accepted', ({ signal, answerId }) => {
          const peerIdx = findPeer(answerId);
          peerIdx.peer.signal(signal);
        });

        socket.on('FE-user-leave', ({ userId, userName }) => {
          const peerIdx = findPeer(userId);
          peerIdx.peer.destroy();
          setPeers((users) => {
            users = users.filter((user) => user.peerID !== peerIdx.peer.peerID);
            return [...users];
          });
          peersRef.current = peersRef.current.filter(({ peerID }) => peerID !== userId );
        });
      });

    socket.on('FE-toggle-camera', ({ userId, switchTarget }) => {
      const peerIdx = findPeer(userId);

      setUserVideoAudio((preList) => {
        let video = preList[peerIdx.userName].video;
        let audio = preList[peerIdx.userName].audio;

        if (switchTarget === 'video') video = !video;
        else audio = !audio;

        return {
          ...preList,
          [peerIdx.userName]: { video, audio },
        };
      });
    });

    const detect = async () => {
    
      if (userVideoRef.current && role === "student") {
        const constraints = { video: { facingMode: 'user' } };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        userVideoRef.current.srcObject = stream;
        userVideoRef.current.play();

        // Function to load face-api.js models
        const loadModels = async () => {         
          await faceApi.loadSsdMobilenetv1Model('/models')
          await faceApi.loadFaceLandmarkModel('/models')
          await faceApi.loadFaceRecognitionModel('/models')
          console.log("Models loaded");
        };

        // Function to detect faces
        const detectFaces = async () => {
          
          
          if (userVideoRef.current) {
            const canvas = faceApi.createCanvasFromMedia(userVideoRef.current);
            document.body.append(canvas);
            faceApi.matchDimensions(canvas, userVideoRef.current);

            const detections = await faceApi.detectAllFaces(userVideoRef.current, new faceApi.SsdMobilenetv1Options())
              .withFaceLandmarks().withFaceDescriptors();                                          

            if (counter.current !== 3) {
              if (detections.length > 0) {
                SuccessToast("Student is present")
              } else {
                FailedToast("Student is not present")
                handleIncrement();
              }
            }
            
          }
        };

        await loadModels();
        setInterval(detectFaces, 5000);

      }
    }
    detect()
    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, []);

  function createPeer(userId, caller, stream) {
  
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socket.emit('BE-call-user', {
        userToCall: userId,
        from: caller,
        signal,
      });
    });

    peer.on('disconnect', () => {
      peer.destroy();
    });

    return peer;
   
  }

  function addPeer(incomingSignal, callerId, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socket.emit('BE-accept-call', { signal, to: callerId });
    });

    peer.on('disconnect', () => {
      peer.destroy();
    });

    peer.signal(incomingSignal);

    return peer;
  }

  function findPeer(id) {
    return peersRef.current.find((p) => p.peerID === id);
  }

  function createUserVideo(peer, index, arr) {
    return (
      <div      
        className={`width-peer${peers.length > 8 ? '' : peers.length} relative flex justify-center items-center`}                  
        onClick={expandScreen}
        key={index}
      >
        {writeUserName(peer.userName)}
        {/* <FaIcon className='fas fa-expand' /> */}
        <VideoCard key={index} peer={peer} number={arr.length} />
      </div>
    );
  }

  function writeUserName(userName) {
    if (userVideoAudio.hasOwnProperty(userName)) {
      if (!userVideoAudio[userName].video) {
        return <UserName key={userName}>{userName}</UserName>;
      }
    }
  }

  // Open Chat
  const clickChat = (e) => {
    e.stopPropagation();
    setDisplayChat(!displayChat);
  };

  // BackButton
  const goToBack = (e) => {
    e.preventDefault();
    socket.emit('BE-leave-room', { roomId, leaver: currentUser });
    window.history.back();
  };

  const toggleCameraAudio = (target:string) => {
    
    setUserVideoAudio((preList) => {
      let videoSwitch = preList['localUser'].video;
      let audioSwitch = preList['localUser'].audio;

      if (target === 'video') {
        const userVideoTrack = userVideoRef.current.srcObject.getVideoTracks()[0];
        videoSwitch = !videoSwitch;
        userVideoTrack.enabled = videoSwitch;
      } else {
        const userAudioTrack = userVideoRef.current.srcObject.getAudioTracks()[0];
        audioSwitch = !audioSwitch;

        if (userAudioTrack) {
          userAudioTrack.enabled = audioSwitch;
        } else {
          userStream.current.getAudioTracks()[0].enabled = audioSwitch;
        }
      }

      return {
        ...preList,
        localUser: { video: videoSwitch, audio: audioSwitch },
      };
    });

    socket.emit('BE-toggle-camera-audio', { roomId, switchTarget: target });
  };

  const clickScreenSharing = () => {
    if (!screenShare) {
      navigator.mediaDevices
        .getDisplayMedia({ cursor: true })
        .then((stream) => {
          const screenTrack = stream.getTracks()[0];

          peersRef.current.forEach(({ peer }) => {
            // replaceTrack (oldTrack, newTrack, oldStream);
            peer.replaceTrack(
              peer.streams[0]
                .getTracks()
                .find((track) => track.kind === 'video'),
              screenTrack,
              userStream.current
            );
          });

          // Listen click end
          screenTrack.onended = () => {
            peersRef.current.forEach(({ peer }) => {
              peer.replaceTrack(
                screenTrack,
                peer.streams[0]
                  .getTracks()
                  .find((track) => track.kind === 'video'),
                userStream.current
              );
            });
            userVideoRef.current.srcObject = userStream.current;
            setScreenShare(false);
          };

          userVideoRef.current.srcObject = stream;
          screenTrackRef.current = screenTrack;
          setScreenShare(true);
        });
    } else {
      screenTrackRef.current.onended();
    }
  };

  const expandScreen = (e) => {
    const elem = e.target;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  };

  const clickBackground = () => {
    if (!showVideoDevices) return;

    setShowVideoDevices(false);
  };

  const clickCameraDevice = (event) => {
    if (event && event.target && event.target.dataset && event.target.dataset.value) {
      const deviceId = event.target.dataset.value;
      const enabledAudio = userVideoRef.current.srcObject.getAudioTracks()[0].enabled;

      navigator.mediaDevices
        .getUserMedia({ video: { deviceId }, audio: enabledAudio })
        .then((stream) => {
          const newStreamTrack = stream.getTracks().find((track) => track.kind === 'video');
          const oldStreamTrack = userStream.current
            .getTracks()
            .find((track) => track.kind === 'video');

          userStream.current.removeTrack(oldStreamTrack);
          userStream.current.addTrack(newStreamTrack);

          peersRef.current.forEach(({ peer }) => {
            // replaceTrack (oldTrack, newTrack, oldStream);
            peer.replaceTrack(
              oldStreamTrack,
              newStreamTrack,
              userStream.current
            );
          });
        });
    }
  };
    return (
    <div className="flex w-full max-h-screen flex-row"onClick={clickBackground}>
      <div className='relative w-full h-screen'>
        <div className='max-w-full h-[92%] flex flex-row justify-around flex-wrap items-center p-[15px] border-box gap-2'>
          {/* Current User Video */}
          <div
            className={`width-peer${peers.length > 8 ? '' : peers.length} relative flex justify-center items-center`}
          >
            {userVideoAudio['localUser'].video ? null : (
              <div className='absolute text-lg z-10'>{currentUser}</div>
            )}
           
            <video
              onClick={expandScreen}
              ref={userVideoRef}
              muted
              autoPlay
              playInline
            ></video>
          </div>
          {/* Joined User Vidoe */}
          {peers &&
            peers.map((peer, index, arr) => createUserVideo(peer, index, arr))}
        </div>
        <BottomBar
          clickScreenSharing={clickScreenSharing}
          clickChat={clickChat}
          clickCameraDevice={clickCameraDevice}
          goToBack={goToBack}
          toggleCameraAudio={toggleCameraAudio}
          userVideoAudio={userVideoAudio['localUser']}
          screenShare={screenShare}
          videoDevices={videoDevices}
          showVideoDevices={showVideoDevices}
          setShowVideoDevices={setShowVideoDevices}
                  />
      </div>
      <div className="relative">
         
        <Chat display={displayChat} roomId={roomId} />        
      </div>
      
    </div>
  );
};




export default Room;