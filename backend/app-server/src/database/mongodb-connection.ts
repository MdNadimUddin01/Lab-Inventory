import {MongoClient , Db} from "mongodb"
export class MongodbConnection{

    private mongoClient = MongoClient;
    protected db:Db
    protected client:MongoClient
    //why signature

    mongodbConfig:{
        dbName:string,
        clusterURL:string,
        userName:string,
        password:string
    };

    constructor(mongodbConfig :{dbName:string,
        clusterURL:string,
        userName:string,
        password:string}){
            this.mongodbConfig = mongodbConfig
    }

    private mongodbURLString(){
        return `mongodb+srv://${this.mongodbConfig.userName}:${this.mongodbConfig.password}@${this.mongodbConfig.clusterURL}/${this.mongodbConfig.dbName}?retryWrites=true&w=majority`
    }
    // why not dunction
    public async  init(){

        const mongdbUrl = this.mongodbURLString();
        this.client = new this.mongoClient(mongdbUrl);

        try{
            await this.client.connect();

            if(this.client.db(this.mongodbConfig.dbName)){
                this.db = this.client.db(this.mongodbConfig.dbName);
            }
            console.log("Mongodb connected")

        }catch(error){
            console.log(error.message)
        }

    }


    public getDb():Db{

        if(!this.db){
            throw Error("Database is not initialized")
        }
        return this.db
    }

    public checkmongoDbClientConnection(){

        let isConnection = false;

        if(this.client){
            isConnection = true
        }
        return isConnection;
    }

    public async cleanUp():Promise<void>{

        if(this.client){
            await this.client.close();
            this.client = null
        }
    }
}