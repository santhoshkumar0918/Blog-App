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
async createAccount ({email,password,name}) {
    try {
        const userAccount  = await this.account.create(ID.unique(),email,password,name)

        if (userAccount) {
            return this.account(email,password)
            
        } else {
            
        }
    } catch (error) {
        throw error
    }
}
async login ({email,password}) {
    try {
        return await this.account.createEmailPasswordSession(email,password)
    } catch (error) {
        throw error
    }}
async getCurrentUser( ){
try {
    
} catch (error) {
    console.log("Appwrite :: getCurrentUser() :: error" ,error)
}
}
async logout () {
try {
    return await this.account.deleteSessions()
} catch (error) {
    console.log("Appwrite :: logout() :: error",error)
}

}
}

const authService =  new AuthService()

export default  authService
