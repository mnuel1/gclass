
type props = {
    name : string;
    
}

export const Textarea:React.FC<props> = ({name}) => {

    return (
        <div className='flex flex-col'>
            <label className="font-bold gap-2 flex items-center">{name} <span className="text-xs text-gray-500"> </span> </label>
            <textarea rows={4} cols={50} className="px-4 py-2 outline-none"/>    
        </div>
    )
}