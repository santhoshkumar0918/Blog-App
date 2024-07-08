import React, { useId } from 'react'


const Input  = React.forwardRef( function Input({
    label,
    type = 'Text',
    className = '',
    // ...props: This collects the remaining props into a props object.
    ...props},
    ref){
    const id = useId()
   return <>
     <div className='w-full'>
 {/* {label && ( ... )}: This is a conditional rendering expression.
It checks if the label variable is truthy. If label is truthy (i.e., it exists and is not null, undefined, or false),
 then the code inside the parentheses will be rendered. If label is falsy, the code inside the parentheses will not be rendered. */}
        {label &&
        (
            <input htmlfor={id}
            className='inline-block mb-1 pl-1 '>{label}</input>
        )}
        <input 
         className={`px-3 py-2 rounded-lg bg-white text-black focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className} `}
        type={type}
        ref={ref}
         {...props}
        id={id}
        
          ></input>
     </div>
   </>


    })


export default Input 