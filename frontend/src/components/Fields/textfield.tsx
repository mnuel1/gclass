
type props = {
    name : string;
    
}

export const Textfield:React.FC<props> = ({name}) => {

    return (
           
        <label
            htmlFor={name}
            className="relative block overflow-hidden rounded-md border border-gray-200 
             px-3 pt-3 shadow-sm focus-within:border-gray-600 focus-within:ring-1 focus-within:ring-gray-600"
        >
            <input
            required
            type="text"
            id={name}
            placeholder={name}
            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            />

            <span
                className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
            >
                {name} <span className="text-red-600">*</span>
            </span>
        </label>
        
    )
}

