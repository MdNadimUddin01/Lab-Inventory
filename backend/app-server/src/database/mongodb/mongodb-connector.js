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
exports.MongodbConnector = void 0;
class MongodbConnector {
    constructor(mongodbConnection) {
        this.mongodbConnection = mongodbConnection;
    }
    getDb() {
        if (!this.mongodbConnection.getDb()) {
            throw Error("Datebase is not initialised");
        }
        return this.mongodbConnection.getDb();
    }
    saveDocument(colllectionName, filterObject, document) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            yield ((_a = this.getDb()) === null || _a === void 0 ? void 0 : _a.collection(colllectionName).updateOne(filterObject, { $set: document }));
        });
    }
    saveDocuments(colllectionName, filterObject, document) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            yield ((_a = this.getDb()) === null || _a === void 0 ? void 0 : _a.collection(colllectionName).updateMany(filterObject, { $set: document }));
        });
    }
    createDcoument(collectionName, document) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return yield ((_a = this.getDb()) === null || _a === void 0 ? void 0 : _a.collection(collectionName).insertOne(document));
        });
    }
    createDocuments(collectionName, documents) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return yield ((_a = this.getDb()) === null || _a === void 0 ? void 0 : _a.collection(collectionName).insertMany(documents));
        });
    }
    getDocument(collectionName_1, filterObject_1) {
        return __awaiter(this, arguments, void 0, function* (collectionName, filterObject, options = {}) {
            return yield this.getDb().collection(collectionName).findOne(filterObject, options);
        });
    }
    getDocuments(collectionName_1, filterObject_1) {
        return __awaiter(this, arguments, void 0, function* (collectionName, filterObject, options = {}) {
            const instrument = yield this.getDb().collection(collectionName).find(filterObject, options).toArray();
            return instrument;
        });
    }
    deleteDocument(collectionName, filterObject) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getDb().collection(collectionName).deleteOne(filterObject);
            return result.acknowledged;
        });
    }
    deleteDocuments(collectionName, filterObject) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const result = yield ((_a = this.getDb()) === null || _a === void 0 ? void 0 : _a.collection(collectionName).deleteMany(filterObject));
            return result.acknowledged;
        });
    }
    getAllInstrument(collectionName, filterObject) {
        return __awaiter(this, void 0, void 0, function* () {
            const instruments = yield this.getDb().collection(collectionName).aggregate([
                {
                    $lookup: {
                        from: "Instrument",
                        localField: "instrumentId",
                        foreignField: '_id',
                        as: 'instrumentDetails'
                    }
                },
                {
                    $unwind: '$instrumentDetails'
                },
                {
                    $lookup: {
                        from: 'User',
                        localField: 'studentId',
                        foreignField: '_id',
                        as: 'studentDetails'
                    }
                },
                {
                    $unwind: "$studentDetails"
                }
            ]).toArray();
            return instruments;
        });
    }
}
exports.MongodbConnector = MongodbConnector;
