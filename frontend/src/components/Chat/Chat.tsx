import React, { useEffect, useState, useRef } from 'react';

import socket from '../../socket';

interface ChatProp {
  display:boolean,
  roomId?:string 
}

interface Message {
  sender: string,
  msg:string
}

const Chat: React.FC<ChatProp> = ({display, roomId}) => {
  const currentUser = sessionStorage.getItem('user');
  const [msg, setMsg] = useState<Message[]>([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef();
  
  useEffect(() => {
    socket.on('FE-receive-message', ({ msg, sender }) => {
      setMsg((msgs) => [...msgs, { sender, msg }]);
    });
  }, []);

  // Scroll to Bottom of Message List
  useEffect(() => {scrollToBottom()}, [msg])

  const scrollToBottom = () => {
    // @ts-ignore
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth'});
  }

  const sendMessage = (e:any) => {
    if (e.key === 'Enter') {
      const msg = e.target.value;

      if (msg) {
        socket.emit('BE-send-message', { roomId, msg, sender: currentUser });
        // @ts-ignore
        inputRef.current.value = '';
      }
    }
  };

  return (
    <div
      className={`absolute top-0 right-0 flex flex-col h-full bg-white transition-transform duration-500 ease-in-out overflow-hidden ${
        display ? 'translate-x-0 w-[320px]' : 'translate-x-full w-0'
      }`}
    >      
      <h1 className="w-full mt-4 font-semibold text-lg text-black">Chat Room</h1>
        <div className="w-full h-[83%] max-h-[83%] overflow-x-hidden overflow-y-auto">
          <div className="flex flex-col w-full p-4 text-[#454552]">
            {msg &&
              msg.map(({ sender, msg }, idx) => {
                if (sender !== currentUser) {
                  return (
                    <div key={idx} className="w-full flex flex-col items-start text-left mt-4 text-base">
                      <strong className="ml-1 text-black">{sender}</strong>
                      <p className="max-w-[65%] w-auto p-2 mt-1 border border-[#4ea1d380] 
                        rounded-lg shadow-sm text-sm text-black">
                        {msg}
                      </p>
                    </div>
                  );
                } else {
                  return (
                    <div key={idx} className="w-full flex flex-col items-end text-right mt-4 text-base ">
                      <strong className="ml-1 text-black">You</strong>
                      <p className="max-w-[65%] w-auto p-2 mt-1 border border-[#4ea1d380] 
                        rounded-lg bg-[#4ea1d3] text-white text-sm">
                        {msg}
                      </p>
                    </div>
                  );
                }
              })}
            <div className="clear-both float-left" ref={messagesEndRef} />
          </div>
        </div>
        
        <input
          // @ts-ignore
          ref={inputRef}
          onKeyUp={sendMessage}
          placeholder="Enter your message"
          className="text-sm absolute bottom-20 w-full h-[8%] p-4 
          border-t border-[#45455240] opacity-70 focus:outline-none text-black"
        />
    
    </div>
  );
}

export default Chat;
  