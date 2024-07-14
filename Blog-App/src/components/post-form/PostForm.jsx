import React, { useCallback } from 'react'
import Select from '../Select.jsx'
import RTE from '../RTE.jsx'
import Input from '../Input.jsx'
import Button from '../Button.jsx'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import appwriteService from '../../appwrite/config.js'



function PostForm( {post}){
  
   const { regsiter,handleSubmit,control,watch,setValue,getValue} = useform(
    {
      defaultValues:{
        value: post?.value || "",
        title: post?.title  || "",
        slug: post?.slug || "",
        content : post?.content ||"", 
        status : post?.status || " active"
      }
    }
   )

   const navigate = useNavigate()
   const userData = useSelector((state) => state.auth.userData )

   const submit = async () => {
    
   }

   const slugTransform = useCallback((value) => {
    if(value && typeof value ==='string')
      return value.trim().toLowerCase()
      .replace(/[^a-zA-Z\d\s]+/g, '-')
      .replace(/\s/g,'-')
    },[])

    React.useEffect(() => {
      watch(({name},value) => {
        if(name === 'title'){
          setValue("slug",slugTransform(value.title),{shouldValidate : true})

        }
      })
      
      
    },[])
  




  return (
   <form onSubmit={handleSubmit(submit)}>
   <div
   className='flex flex-wrap'>
   <Input 
   label={title}
   placeholder = 'title'
   
   ></Input>


   </div>

   </form>
  )
}

export default PostForm