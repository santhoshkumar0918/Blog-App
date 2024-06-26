import {Client,Account,ID} from 'appwrite'
import confi from '../confi/confi.js'



export class AuthService { 
client = new Client()
account;

constructor(){
    this.client
    .setEndpoint(confi.appwriteUrl).setProject(confi.appwriteProjectId)
    this.account =  new Account(this.client)

}
async createAccount () {}
async login () {}
async getCurrentUser( ){}
async logout () {}
}
