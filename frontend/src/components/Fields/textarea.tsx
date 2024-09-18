
type props = {
    name : string;
    value: string;
    setValue: (value: string) => void;
}

export const Textarea:React.FC<props> = ({name, value, setValue}) => {

    return (        
        <div>
            <label htmlFor={name} className="text-sm text-gray-500 "> {name} </label>

            <textarea
            id={name}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mt-2 w-full rounded-lg border-gray-200 align-top shadow-sm sm:text-sm p-4 
            border focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            rows={4}
            placeholder="Enter description.."
            ></textarea>
        </div>
    )
}