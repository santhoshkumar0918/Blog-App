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
        
    } catch (error) {
        
    }
  }


}