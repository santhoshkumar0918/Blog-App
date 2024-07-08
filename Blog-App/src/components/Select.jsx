import React, { useId } from 'react'

function Select({
    options,
    
    className = ' ',
    ...props
},ref) {


     const id = useId()
     return<>
       <div className='w-full'>
      {label && (
        <input htmlfor = {id}  className='inline-block mb-1 p-1'>{label}</input>
      )}
    <select 
    className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full  ${className}`}
    id={id}
    ref={ref}
    {...props}
    
    >
        {
         options.map((option) => (
            <option 
            key={option}
            value={option}>{option}</option>
         ))

        }
    </select>


       </div>
       
     </>

}

export default React.forwardRef(Select)