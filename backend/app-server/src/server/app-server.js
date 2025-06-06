"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const express_1 = __importStar(require("express"));
const database_1 = require("../database");
const environment_1 = require("../environment");
const mongodb_1 = require("../database/mongodb");
const router_1 = require("./router");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const router = (0, express_1.Router)();
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.use((0, cors_1.default)({ origin: "http://localhost:5173", credentials: true }));
    app.use("/api", router);
    app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.body);
    }));
    const mongodbConnection = new database_1.MongodbConnection({ dbName: environment_1.environment.appServerMongodbConfig.dbName, clusterURL: environment_1.environment.appServerMongodbConfig.clusterURL,
        userName: environment_1.environment.appServerMongodbConfig.userName, password: environment_1.environment.appServerMongodbConfig.password });
    mongodbConnection.init();
    const mongodbConnector = new mongodb_1.MongodbConnector(mongodbConnection);
    const port = environment_1.environment.port;
    app.listen(port, () => {
        console.log('server is listening at 8000');
    });
    (0, router_1.RouterA)(router, mongodbConnector);
});
exports.init = init;
