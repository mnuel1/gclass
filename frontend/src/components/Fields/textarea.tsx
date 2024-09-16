
type props = {
    name : string;
    
}

export const Textarea:React.FC<props> = ({name}) => {

    return (        
        <div>
            <label htmlFor={name} className="text-sm text-gray-500 "> {name} </label>

            <textarea
            id={name}
            className="mt-2 w-full rounded-lg border-gray-200 align-top shadow-sm sm:text-sm p-4 
            border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            rows={4}
            placeholder="Enter description.."
            ></textarea>
        </div>
    )
}