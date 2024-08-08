import React from 'react'
import  {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {

    const dispatch = useDispatch()

   const logoutHandler = () => {
    authService.logout().then(() => {
        dispatch(logout())
    })
   }   

  return (
    
    <button className='className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow"' 
    onChange={logoutHandler}
    >Logout </button> 
  )
}

export default LogoutBtn


