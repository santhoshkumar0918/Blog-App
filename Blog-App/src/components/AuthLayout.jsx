import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({children,authentication = true}) {
   
  const authStatus = useSelector ((state) => state.authStatus)

  const [loader,setLoader] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    // In this condition we requires authentication but authStatusis not equal to authentication .,
    //  so ,now we can redirect it to login page to authentication.
    if(authentication && authStatus !== authentication){
      navigate("/login")
    }
    // In this case we are logged in , so we dont need authentication but you want to saw all posts ,
    // so it navigateds to home page .
    else if(!authentication && authStatus !== authentication){
      navigate("/")
    }
    // this state is to set all to null means intial state ones all done.
    setLoader(false)
  },[authStatus,authentication,navigate])

  // This state used for reload 
return loader ? null : <>{children}</>
}

export default Protected