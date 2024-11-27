import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../../socket';

const Main: React.FC = () => {
  const [roomName, setRoomName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [err, setErr] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>('');  
  const navigate = useNavigate();

  useEffect(() => {   
    socket.on('FE-error-user-exist', ({ error }: { error: boolean }) => {
      if (!error) {
        sessionStorage.setItem('user', userName);
        navigate(`/room/${roomName}`);
      } else {
        setErr(true);
        setErrMsg('User name already exists');
      }
    });

    return () => {
      socket.off('FE-error-user-exist');
    };
  }, [navigate, userName, roomName]);

  const clickJoin = () => {    
    if (!roomName || !userName) {
      setErr(true);
      setErrMsg('Enter Room Name or User Name');
    } else {
      console.log('Emitting BE-check-user event:', { roomId: roomName, userName });
      socket.emit('BE-check-user', { roomId: roomName, userName });      
    }
  };

  return (
    <div className="flex flex-col text-black">
      <div className="flex items-center justify-end mt-[15px] leading-9 text-black">
        <label htmlFor="roomName" className='text-white'>Room Name</label>
        <input
          className="w-[150px] h-[35px] ml-[15px] pl-[10px] outline-none border-0 "
          type="text"
          id="roomName"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)} // Controlled input
        />
      </div>
      <div className="flex items-center justify-end mt-[15px] leading-9">
        <label htmlFor="userName" className='text-white'>User Name</label>
        <input
          className="w-[150px] h-[35px] ml-[15px] pl-[10px] outline-none border-0"
          type="text"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)} // Controlled input
        />
      </div>
      <button
        className="h-[40px] mt-[35px] outline-none text-[#d8e9ef] bg-[#4ea1d3]
      text-xl font-medium hover:bg-[#7bb1d1]"
        type="button"
        onClick={clickJoin}
      >
        Join
      </button>
      {err ? (
        <div className="mt-[10px] text-lg text-[#e85a71]">{errMsg}</div>
      ) : null}
    </div>
  );
};

export default Main;
