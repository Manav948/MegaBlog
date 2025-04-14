//this file is used to configure the appwrite client and database and and handle the database and storage operations.
import conf from "../conf/conf"
import { Client, ID, Databases, Query, Storage } from "appwrite";

export class Service {
    client = new Client();
    Databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.Databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.Databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        }
        catch (error) {
            throw error;
        }
    }

    async updatePsot(slug, { title, content, featuredImage, status }) {
        try {
            return await this.Databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        }
        catch (error) {
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            return await this.Databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
        }
        catch (error) {
            throw error;
        }
    }

    async getPost(slug) {
        try {
            return await this.Databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
        }
        catch (error) {
            throw error;
            return false;
        }
    }

    async listPosts(queries = [Query.equal('status', 'active')]) {
        try {
            await this.Databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        }
        catch (error) {
            throw error;
        }

    }

    // create a file upload service 

    async uploadFile(file) {
        try {
            await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
            return true;
        }
        catch (error) {
            throw error;
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            return true;
        } 
        catch (error) {
           throw error; 
        }
    }

    getPreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service();

export default Service;