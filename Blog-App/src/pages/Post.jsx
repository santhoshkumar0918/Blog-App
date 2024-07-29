import React,{useState,useEffect} from 'react'
import { Link,useNavigate,useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Button from '../components/Button'
import Input from '../components/Input'
import Parse from 'html-react-parser'
import authService from '../appwrite/config'

function Post() {
  
   const [post,setPost] = useState(null)
   const navigate = useNavigate()
   const userData = useSelector((state) => state.auth.userData )
   const isAuthor = post && userData ? post.userId === userData.$id : false
   const slug = useParams(slug)

  useEffect(() => {
  if (slug) {
    appwriteService.getpost(slug).then((post) => {
      if (post) {
       setPost(post)        
      }
      else{
        navigate("/")
      }
    })    
  } 

  },[slug,navigate])



   const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if(status){
        appwriteService.deleteFile(post.featuredImage);
      }else{
        navigate("/")
      }
    })
   }
 

  return post ? (
  <div className="py-8" >
    <Container>
      <div className=' w-full flex justify-center mb-4 relative border rounded-xl p-2'>
        <img src={appwriteService.getFilePreview(post.featuredImage)} alt={post.title} className='rounded-xl'/>
        {isAuthor && (
            <div className="absolute-right-6 top-6">
              <Link to={`/edit/post/${post.$id}`}>
              <Button bgColor='bg-red-500' onClick={deletePost} >Delete</Button>
              </Link>
            </div>
        )}
            </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <div className='brower-css'>
            {Parse(post.content)}
          </div>
      </div>
    </Container>
  </div>  
  ): null
}

export default Post