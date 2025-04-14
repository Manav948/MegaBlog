import { Client, Databases, ID, Query } from 'appwrite';
import conf from '../conf/conf';

export class Service {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            { title, content, featuredImage, status, userId }
        );
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            { title, content, featuredImage, status }
        );
    }

    async deletePost(slug) {
        return await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        );
    }

    async getPost(slug) {
        return await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        );
    }

    async getPosts() {
        return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            [Query.orderDesc('$createdAt')]
        );
    }

    getFilePreview(fileId) {
        return `${conf.appwriteUrl}/v1/storage/files/${fileId}/preview?project=${conf.appwriteProjectId}`;
    }

    async uploadFile(file) {
        return await this.client.storage.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        );
    }

    async deleteFile(fileId) {
        return await this.client.storage.deleteFile(conf.appwriteBucketId, fileId);
    }
}

const appwriteService = new Service();
export default appwriteService;
