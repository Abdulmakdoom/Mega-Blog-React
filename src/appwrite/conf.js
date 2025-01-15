import config from '../config/config.js'
import { Client, ID, Databases, Storage, Query } from "appwrite";

// bucket - storage

export class Service{
    client = new Client();
    Databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
            this.Databases = new Databases(this.client);
            this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try{
            return await this.Databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId, 
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )

        } catch (error){
            throw error;
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}) {
        try{
            return await this.Databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error){
            throw error;
        }
    }

    async deletePost(slug){
        try{
            await this.Databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error){
            console.log(error);
            return false;
            
        }
    }

    async getPost(slug){   // get single post   
        try{
            return await this.Databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error){
            throw error;
        }
    }

    async getPosts(queries = [Query.equal("status", 'active')]){  // get all posts
        try{
            return await this.Databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                // [
                //     Query.equal("status", 'active')
                // ]
                queries,
            )
        } catch (error){
            console.log(error);
            return false
            
        }
    }

    // File upload Service

    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error){
            console.log(error);
            return false;
            
        }
    }

    async deleteFile(fileId ){
        try{
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error){
            console.log(error);
            return false;
            
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service();
export default service;


