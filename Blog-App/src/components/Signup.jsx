import React, { useState } from 'react'
import authService from '../appwrite/auth'
import Button from './Button'
import Logo from './Logo'
import Input from './Input'
import { Link,useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import {login} from '../store/authSlice'


function Signup() {

 const navigate = useNavigate()
 const [error,setError] = useState("")
 const dispatch = useDispatch()
 const [regsiter,handleSubmit] = useForm()
  

 const create  = async (data) => {
   setError("")
    try {
        console.log(data)
        const userData  = await authService.createAccount(data)
        if(userData){
            const userData = await authService.getCurrentUser()
            if(userData) 
                dispatch(login({userData}))
               navigate("/")
        }
    } catch (error) {
        setError(error.message)
    }
   
 }


  return (
    <div className='flex items-center justify-center '>
        <div className={`mx-auto w-full mx-w-lg bg-gray-400 p-10 rounded-xl border border-black/10`}>
        <div className='mb-2 flex justify-center'>
            <span className='inline-block w-full mx-w-[100px'>
                <Logo width='100%'/>
            </span>
        </div>
        <h2
        className='text-center text-2xl font-bold leading-tight'>
        Signup to create a account</h2>
        <p 
        className='mt-2 text-center text-base text-black/60'
        >Already have an account
        <Link
        to="/login"
        className='font-medium text-primary  transition-all duration-200 hover:underline'
        >
            Signup
        </Link>
   </p>
   {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
        <form className='mt-8' onSubmit={handleSubmit(create)}>
            <div className='space-y-5'></div>
            <Input
            {...regsiter("name",{required:true})}
            label='Full name :'
            placeholder='Enter your full name'
            ></Input>
            <Input
            {...regsiter("name",{required:true})}
            label='Email:'
            placeholder='Enter your Email'
            type='email'
            />
            <Input
            {...regsiter("password",{required:true})}
            label='Password'
            placeholder='Enter Password'
            type='password'
            />
            <div>
                <Button className='w-full' type='submit'>
                    Create Account
                </Button>
            </div>


  
        </form>
        </div>
    </div>
  )
}

export default Signup
