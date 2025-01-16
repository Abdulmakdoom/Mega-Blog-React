import config from '../config/config.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client(); 
    account; 

    constructor() {  // constructor is a method that is called when an instance of a class is created , In this case, the constructor is called when the AuthService object is created, and it initializes the client and account properties.
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({ email, password });
            } else {
                return userAccount;
            }
            
        } catch (error) {
            throw error
            
        }
        
    }

    async login({ email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error
            
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log(error)
        }
        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSessions(); // delete account/ delete session
        } catch (error) {
            throw error;
        }
    }
    
}

const authService = new AuthService(); // as a singleton, we only need one instance of the AuthService class, so we create an instance of the AuthService class and export it as a constant. 
                                       // so output will be a object of AuthService class


export default authService; // obj of AuthService class is exported as default;





