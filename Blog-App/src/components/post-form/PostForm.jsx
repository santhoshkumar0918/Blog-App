import React, { useCallback } from 'react'
import Select from '../Select.jsx'
import RTE from '../RTE.jsx'
import Input from '../Input.jsx'
import Button from '../Button.jsx'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import appwriteService from '../../appwrite/config.js'
import { useForm } from 'react-hook-form'



function PostForm( {post}){
  
   const { regsiter,handleSubmit,control,watch,setValue,getValue} = useForm(
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

   const submit = async (data) => {
    if(post){
      const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]):null
    }

    if(file){
      appwriteService.deleteFile(post.featuredImage)
    }

    const dbPost = await appwriteService.updatePost(post.$id,{
      ...data,
      featuredImage : file ? file.$id : undefined
    })

      if(dbPost){
        navigate(`/post/${dbPost.$id}`)
      }
      else{
        const file = await appwriteService.uploadFile(data.image[0])
        if(file){
          const fileId = file.$id
          data.featuredImage = fileId
          const dbPost = await appwriteService.createPost({...data,userid : userData.$id})
          if(dbPost){
            navigate(`/post/${dbPost.$id}`)
          }
        }

      }
    
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
   label={Title}
   placeholder = 'Title'
   className = 'mb-4'
   {...regsiter("title", {required: true})}></Input>
   <Input
  label="Slug :"
  placeholder="Slug"
  className="mb-4"
  {...regsiter("slug", {required: true})}
  onInput ={(e) => {
    setValue("slug",slugTransform(e.currentTarget.value),{shouldValidate:true})
  } }/>
  <RTE 
  label="content"
  name="content"
  control={control}
  defaultValue={getValue("content")}
  /> </div>
  <div className='1/3 px-2'>
  <Input
  className='mb-4'
  label='featuredImage'
  type='file'
  accept='image/png,image/jpg,image/jpeg'
  {...regsiter("image",{required:!post})}
  />
  {
    post&&(
      <div className='w-full mb-4 '>
        <img src={appwriteService.getFilePreview(post.featuredImage)} alt={post.title}/>
        <Select
        options={["active","inactive"]}
        className='mb-4'
        label='status'
       {...regsiter(status,{required:true})}
        ></Select>
        <Button
        type='submit'
        bgColor={post ? bg-green-500 : undefined}
        className='w-full'
        >
          {post ? "update" : "Submit"}
        </Button>
      </div>
    )
  }

  </div>

   </form>
  )
}

export default PostForm