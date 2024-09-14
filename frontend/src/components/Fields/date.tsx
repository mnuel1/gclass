
type props = {
    name : string;
    
}

export const DateField:React.FC<props> = ({name}) => {

    return (
        <div className='flex flex-col py-2'>
            <label className="font-bold gap-2 flex items-center">{name} <span className="text-xs"> </span> </label>
            <input type="date" className="px-4 py-2 outline-none"/>    
        </div>
    )
}