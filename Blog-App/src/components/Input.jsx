import React, { useId } from 'react'


const Input  = React.forwardRef( function Input({
    label,
    type = 'Text',
    classname = '',
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
        className=''
        type={type}
        ref={ref}
        id={id}
        {...props}
        
        ></input>
     </div>
   </>


    })


export default Input 