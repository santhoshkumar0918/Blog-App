import confi from "../confi/confi.js";
import { Client,Databases,Query,Storage,ID} from "appwrite";

export class Service {

  client  = new Client()
  databases;
  bucket;


  constructor (){
    this.client.setEndpoint(confi.appwriteUrl).setProject(confi.appwriteProjectId)
    this.databases = new Databases(this.client)
    this.bucket = new Storage(this.client)
  }

  async getPost(slug){
    try {
        return await this.databases.getDocument(confi.appwriteDatabaseId,confi.appwriteCollectionId,slug)
    } catch (error) {
        console.log("Appwrite Service :: getPost() ::error" ,error)
        return false
    }
  }

  async getPosts(queries = [Query.equal("status","Active")]){
   try {
    await this.databases.listDocuments(confi.appwriteDatabaseId,confi.appwriteCollectionId,queries)
   } catch (error) {
    console.log("Appwrite Service :: getPosts() ::error" ,error)
    return false
   }
  }

  async createPost({title,status,slug,content,featuredimage,userid})
  {
    try {
      await this.databases.createDocument(confi.appwriteCollectionId,confi.appwriteDatabaseId,slug,
      {
        title,content,status,featuredimage,userid
          
        }
      )

      }

     catch (error) {
      console.log("Appwrite Service :: createPost() ::error" ,error)
      return false
    }

  }
  async updatePost(slug,{title,status,content,featuredimage})
  {
    try {
    return  await this.databases.updateDocument(confi.appwriteCollectionId,confi.appwriteDatabaseId,slug,
      {
        title,status,content,featuredimage
          
        })
      }
     catch (error) {
      console.log("Appwrite Service :: createPost() ::error" ,error)
      return false
    }

  }
  async deletePost(slug) {
    try {
    return  await this.databases.deleteDocument(confi.appwriteCollectionId,confi.appwriteDatabaseId,slug,)
      }
     catch (error) {
      console.log("Appwrite Service :: deletePost() ::error" ,error)
      return false
    }

  }

  async uploadFile(File){
   try {
     return await this.bucket.createFile(confi.appwriteBucketId,ID.unique(),File)
   } catch (error) {}
    console.log("Appwrite Service :: uploadFile() ::error" ,error)
      return false
   }

    async deleteFile(fileId){
      try {
        return await  this.bucket.deleteFile(confi.appwriteBucketId,fileId)

        
      } catch (error) {
        console.log("Appwrite Service :: deleteFile() ::error" ,error)
      return false
      }
    }
  getFilePreview(fileId) {
   this.bucket.getFilePreview(confi.appwriteBucketId,fileId).href
  }

  }

  const service = new Service()
  export default service


