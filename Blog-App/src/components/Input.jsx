import React, { useId } from 'react'


const Input  = React.forwardRef( function Input({
    label,
    type = 'Text',
    classname = '',
    ...props},
    ref){
    const id = useId()
   return <>
     <div className='w-full'>
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