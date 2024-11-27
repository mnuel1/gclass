import React, { useCallback } from 'react';

type BottomBarProps = {
  clickChat: () => void;
  clickCameraDevice: () => void;
  goToBack: () => void;
  clickParticipants: () => void;
  toggleCameraAudio: (arg0: string) => void;
  userVideoAudio: {
    video: boolean;
    audio: boolean;
  };
  clickScreenSharing: () => void;
  screenShare: boolean;
  videoDevices: { deviceId: string; label: string }[];
  showVideoDevices: boolean;
  setShowVideoDevices: React.Dispatch<React.SetStateAction<boolean>>;
};

const BottomBar: React.FC<BottomBarProps> = ({
  clickChat,
  clickCameraDevice,
  goToBack,
  toggleCameraAudio,
  userVideoAudio,
  clickScreenSharing,
  screenShare,
  videoDevices,
  showVideoDevices,
  setShowVideoDevices,
  clickParticipants
}) => {
  const handleToggle = useCallback(() => {
      setShowVideoDevices((state) => !state);
    },
    [setShowVideoDevices]
  );

  return (
    <div className="absolute bottom-0 right-0 w-full h-1/12 flex items-center justify-center font-medium bg-teal-500 p-2 z-50">
      <div className="flex items-center ml-4">
        <div onClick={() => toggleCameraAudio("video")} data-switch="video" 
        className="flex items-center flex-col relative w-20 p-2 hover:bg-teal-400 rounded-lg cursor-pointer">
          <div>
            {userVideoAudio.video ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
           
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 0 1-2.25-2.25V9m12.841 9.091L16.5 19.5m-1.409-1.409c.407-.407.659-.97.659-1.591v-9a2.25 2.25 0 0 0-2.25-2.25h-9c-.621 0-1.184.252-1.591.659m12.182 12.182L2.909 5.909M1.5 4.5l1.409 1.409" />
              </svg>

            )}
          </div>
          <p className='text-sm'>Camera</p>
        </div>
        
        {showVideoDevices && (
          <div className="absolute top-[-16px] left-20 bg-teal-500 text-white p-2 flex flex-col text-left rounded-md">
            {videoDevices.length > 0 &&
              videoDevices.map((device) => (
                <div key={device.deviceId} onClick={clickCameraDevice} data-value={device.deviceId} className="py-1 px-2 hover:bg-teal-400 cursor-pointer">
                  {device.label}
                </div>
              ))}
            <div className="border-t-2 pt-2 cursor-context-menu">Switch Camera</div>
          </div>
        )}
        
        <div onClick={handleToggle} className="absolute top-1 left-24 z-10 p-1 rounded-full bg-teal-600 hover:bg-teal-700 cursor-pointer">
          <i className="fas fa-angle-up text-white text-xs"></i>
        </div>
        
        <div onClick={() => toggleCameraAudio("audio")} data-switch="audio" 
        className="flex items-center flex-col relative w-20 p-2 hover:bg-teal-400 rounded-lg cursor-pointer">
          <div>
            {userVideoAudio.audio ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
              </svg>
            
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-red-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
              </svg>

            )}
          </div>
          <p className='text-sm'>Audio</p>
        </div>
      </div>
      
      <div className="flex-1 flex justify-center">
        <div onClick={clickChat} className="w-20 p-2 hover:bg-teal-400 rounded-lg cursor-pointer flex items-center flex-col ">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>

          </div>
          <p className='text-sm'>Chat</p>
        </div>

        <div onClick={clickScreenSharing} className="w-auto p-2 hover:bg-teal-400 rounded-lg cursor-pointer flex items-center flex-col ">
          <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
          </svg>
            {screenShare}
          </div>
          <p className='text-sm'>Share Screen</p>
        </div>

        <div onClick={clickParticipants} className="w-auto p-2 hover:bg-teal-400 rounded-lg cursor-pointer flex items-center flex-col ">
          <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
          </svg>


          </div>
          <p className='text-sm'>Participants</p>
        </div>
      </div>

      <div className="mr-4 ">
        <div onClick={goToBack} 
        className="w-full h-full p-2 flex items-center flex-row gap-4 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
          </svg>
          
          <p className='text-sm'>Leave Meeting</p>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
