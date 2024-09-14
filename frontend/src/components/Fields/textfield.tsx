
type props = {
    name : string;
    
}

export const Textfield:React.FC<props> = ({name}) => {

    return (
        <div className='flex flex-col'>
            <label className="font-bold gap-2 flex items-center">{name} <span className="text-xs text-gray-500"> (required) </span> </label>
            <input type="text" className="px-4 py-2 outline-none" required/>    
        </div>
    )
}