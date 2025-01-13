import React, {useId} from "react";


const Input = React.forwardRef( function Input ({
    label, type = "text", className = "", ...props 
}, ref){
    const id = useId()
    return (
        <div className="w-full">
            {label && <label className="inline-block mb-1 pl-1" htmlFor={id}>
                {label}
                </label>
            }
            <input type={type} className={`px-3 py-2 rounded-lg bg-white text-black 
                outline-none focus:bg-gray-50 duration-200 
                border border-gray-200 w-full ${className}`} ref={ref} {...props} id={id}/>  
            
                
        </div>
    )
})

export default Input;

// ref -- parent component ka ander refesnce pass krne k liye use hota hai 
// forwardRef -- yeh ek function hai jo ek component ko forward krta hai 
// simple words me keh skte hain k yeh ek component ko forward krta hai to parent component me
// ref baha sai pass bhi kiya jayega or yaha sai state ka access liya jayega 