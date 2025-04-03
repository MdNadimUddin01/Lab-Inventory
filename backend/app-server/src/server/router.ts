import {Router} from "express"
import { MongodbConnector } from "../database/mongodb";
import { user } from "./routes/user";
import { instrument } from "./routes/instrument";
import { issuedInstrument } from "./routes/issuedInstrument";

export function RouterA(router:Router , mongodbConnector:MongodbConnector){

    user(router , mongodbConnector);
    instrument(router , mongodbConnector)
    issuedInstrument(router , mongodbConnector)
    
}