
type props = {
    name : string;
    
}

export const Attachment:React.FC<props> = ({name}) => {

    return (
        <div className='flex flex-col py-2'>
            <label className="font-bold gap-2 flex items-center">{name} <span className="text-xs"> Add file if needed for more instructions</span> </label>
            <input type="file" className="py-2 outline-none"/>    
        </div>
    )
}