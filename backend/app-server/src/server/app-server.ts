import express ,{Router} from "express"
import { MongodbConnection } from "../database"
import {environment} from "../environment"
import { MongodbConnector } from "../database/mongodb"
import { RouterA } from "./router"
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express()
const router = Router()

export const init = async() => {

    app.use(express.json());
    app.use(cookieParser())
    app.use(cors({origin:"https://quantumrack.vercel.app" , credentials:true}));
    app.use("/api" , router)

    app.post("/signup" , async(req,res) => {
        console.log(req.body)
    })

    const mongodbConnection = new MongodbConnection({dbName: environment.appServerMongodbConfig.dbName, clusterURL: environment.appServerMongodbConfig.clusterURL,
        userName: environment.appServerMongodbConfig.userName,password: environment.appServerMongodbConfig.password});

        mongodbConnection.init();

        const mongodbConnector = new MongodbConnector(mongodbConnection);


        const port = environment.port

        app.listen(port , () => {
            console.log('server is listening at 8000');
        })

        RouterA(router , mongodbConnector)


}