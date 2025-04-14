// this file is used to create a authentication service using appwrite sdk

import conf from "../conf/conf.js"
import { Client, Account, ID } from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)
    }
    // create a account with email and password and return a new session

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // create  a new methdod
                return this.login({ email, password });
            }
            else {
                return userAccount;
            }
        }
        catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        }
        catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        }
        catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            console.log(user);
            return user;
        }
        catch (error) {
            console.error("User Not Login ", error);
            return null;
        }
        return null;
    }
};

const authservice = new AuthService();
export default authservice;

