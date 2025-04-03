"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongodbConnection = void 0;
const mongodb_1 = require("mongodb");
class MongodbConnection {
    constructor(mongodbConfig) {
        this.mongoClient = mongodb_1.MongoClient;
        this.mongodbConfig = mongodbConfig;
    }
    mongodbURLString() {
        return `mongodb+srv://${this.mongodbConfig.userName}:${this.mongodbConfig.password}@${this.mongodbConfig.clusterURL}/${this.mongodbConfig.dbName}?retryWrites=true&w=majority`;
    }
    // why not dunction
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const mongdbUrl = this.mongodbURLString();
            this.client = new this.mongoClient(mongdbUrl);
            try {
                yield this.client.connect();
                if (this.client.db(this.mongodbConfig.dbName)) {
                    this.db = this.client.db(this.mongodbConfig.dbName);
                }
                console.log("Mongodb connected");
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
    getDb() {
        if (!this.db) {
            throw Error("Database is not initialized");
        }
        return this.db;
    }
    checkmongoDbClientConnection() {
        let isConnection = false;
        if (this.client) {
            isConnection = true;
        }
        return isConnection;
    }
    cleanUp() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.client) {
                yield this.client.close();
                this.client = null;
            }
        });
    }
}
exports.MongodbConnection = MongodbConnection;
