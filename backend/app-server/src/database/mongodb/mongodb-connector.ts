import { Db, Filter, FindOptions } from "mongodb";
import { MongodbConnection } from "../index";


export class MongodbConnector{

    protected mongodbConnection:MongodbConnection;

    constructor(mongodbConnection:MongodbConnection){
        this.mongodbConnection = mongodbConnection;
    }

    protected getDb():Db{

        if(!this.mongodbConnection.getDb()){
            throw Error("Datebase is not initialised");
        }

        return this.mongodbConnection.getDb();

    }
    

    async saveDocument(colllectionName:string , filterObject : Filter<Document> , document:any) : Promise<void>{
        await this.getDb()?.collection(colllectionName).updateOne(filterObject , {$set:document})
    }

    async saveDocuments(colllectionName:string , filterObject : Filter<Document> , document:any):Promise<void>{
        await this.getDb()?.collection(colllectionName).updateMany(filterObject , {$set:document});
    }

    async createDcoument(collectionName:string , document:any):Promise<any>{
        return await this.getDb()?.collection(collectionName).insertOne(document)
    }

    async createDocuments(collectionName:string , documents:any[]):Promise<any>{
        return await this.getDb()?.collection(collectionName).insertMany(documents)
    }

    async getDocument(collectionName:string , filterObject:Filter<Document> , options:FindOptions<Document> = {}):Promise<any>{
        return await this.getDb().collection(collectionName).findOne(filterObject , options);
    }

    async getDocuments(collectionName:string , filterObject:Filter<Document> , options:FindOptions<Document> = {}):Promise<any>{
        const instrument = await this.getDb().collection(collectionName).find(filterObject , options).toArray();
        console.log("INSTRUMENTS " , instrument);

        return instrument
    }

    

    async deleteDocument(collectionName :string , filterObject:Filter<Document>):Promise<any>{

        const result = await this.getDb().collection(collectionName).deleteOne(filterObject);
        return result.acknowledged;

    }

    async deleteDocuments(collectionName:string , filterObject:Filter<Document>):Promise<any>{
        const result = await this.getDb()?.collection(collectionName).deleteMany(filterObject);
        return result.acknowledged;
    }

}