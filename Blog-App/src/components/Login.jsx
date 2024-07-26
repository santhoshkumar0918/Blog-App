import React, { useState } from 'react'
import authService from '../appwrite/auth'
import Button from './Button'
import Logo from './Logo'
import Input from './Input'
import { Link,useNavigate } from 'react-router-dom'
import { set, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import {login as authLogin} from '../store/authSlice'

function Login() {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error,setError] = useState("")
    const [regsiter,handleSubmit] = useForm()

    const login = async (data) => {
      setError("")
      try {
        const period = await authService.login(data)
        if(period){
          const userData =  await authService.getCurrentUser()
          if (userData) dispatch(authLogin({userData}))
            navigate("/")
        }
      } catch (error) {
        setError(error.message) 
      }
    }
   
  return (
    <div className='flex items-center justify-center w-full'>
        <div className= {`mx-auto w-full max-w-lg rounded-xl bg-gray-400 p-10 border border-black/10`}>
           <div className='mb-2 flex justify-center'>
            <span className='inline-block w-full max-w-[100px]:'>
              <Logo width='100%'/> 
            </span>
           </div>
           <h2 className='mt-8 text-center text-2xl font-bold  leading-tight'>Sign in to your account</h2>
           <p className='text-black/10 text-center text-base mt-2'>
           Don't have any account ?&nbsp;
           <Link to='/signup'
           className='font-medium text-primary transition-all duration-200 hover:underline'/>
           Signup
           </p>
           {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
           <form  className='mt-8' onSubmit={handleSubmit(login)}>
            <div>
            <Input 
            label='Email'
            type='email'
            placeholder='Email Adress:'
            {...regsiter('email',{required:true})}
            />
            <Input
            label='password'
            placeholder='password'
            type='password'
            {...regsiter("password",{required:true})}/>
            <Button 
            type='submit'
            className='mb-4 w-full' 
            >
            Signin {""}
            </Button>
            </div> 
           </form>
         </div>
    </div>
  )
}

export default Login