interface ParticipantProp {
    display:boolean,
    peers: any
  }

const Participants:React.FC<ParticipantProp> = ({display, peers}) => {      
    return (        
        <div
            className={`absolute top-0 right-0 flex flex-col h-full bg-white transition-transform duration-500 ease-in-out overflow-hidden ${
                display ? 'translate-x-0 w-[320px]' : 'translate-x-full w-0'
            }`}>      
            <h1 className="w-full mt-4 font-semibold text-lg text-black">Participants</h1>
            <div className="w-full h-[83%] max-h-[83%] overflow-x-hidden overflow-y-auto">
                <div className="flex flex-col w-full p-4 text-[#454552]">
                    <ul className="list-decimal pl-2 ">
                        {peers && peers.map((peer :any, index:number) => (
                            <li key={index} className="text-black text-sm text-left">
                                {peer.userName}
                            </li>
                        ))}
                    </ul>
                    
                </div>
            </div>
        </div>
        
    )
}

export default Participants