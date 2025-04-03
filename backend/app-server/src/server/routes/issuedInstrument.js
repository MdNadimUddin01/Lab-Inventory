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
exports.issuedInstrument = issuedInstrument;
const mongodb_1 = require("mongodb");
const auth_1 = require("../middleware/auth");
function issuedInstrument(router, mongodbConnector) {
    router.get("/issue/instrument/:id", auth_1.authUSer, (req, res) => __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const userId = req.userInfo.id;
        const { dateOfReturn, costPaid } = req.body;
        try {
            const existingInstrument = yield mongodbConnector.getDocument("Instrument", { _id: new mongodb_1.ObjectId(id) });
            if (!existingInstrument) {
                return res.status(404).send({
                    message: "Instrument not found",
                });
            }
            const alreadyIssued = yield mongodbConnector.getDocument("IssuedInstrument", {
                instrumentId: new mongodb_1.ObjectId(id),
                studentId: new mongodb_1.ObjectId(userId),
            });
            if (alreadyIssued) {
                return res.status(409).send({
                    message: "You have already issued this instrument",
                });
            }
            if (existingInstrument.available > 0) {
                const issueInstrumentInfo = {
                    instrumentId: new mongodb_1.ObjectId(id),
                    studentId: new mongodb_1.ObjectId(userId),
                    dateOfIssue: Date.now(),
                    dateOfReturn: dateOfReturn,
                    totalCost: existingInstrument.costPerPeice,
                    costPaid: costPaid,
                };
                const issuedInstrument = yield mongodbConnector.createDcoument("IssuedInstrument", issueInstrumentInfo);
                if (!issuedInstrument) {
                    return res.status(400).send({
                        message: "Purchase Failed",
                    });
                }
                existingInstrument.available--;
                const data = yield mongodbConnector.saveDocument("Instrument", { _id: existingInstrument._id }, existingInstrument);
                return res.status(200).send({
                    message: "Purchase Successfull",
                });
            }
            else {
                console.log("REQUEST HERE");
                const alreadyRequest = yield mongodbConnector.getDocument("RequestInstrument", {
                    instrumentId: new mongodb_1.ObjectId(id),
                    studentId: new mongodb_1.ObjectId(userId),
                });
                if (alreadyRequest) {
                    return res.status(409).send({
                        message: "You have already Request this instrument",
                    });
                }
                const requestInstrumentInfo = {
                    instrumentId: new mongodb_1.ObjectId(id),
                    studentId: new mongodb_1.ObjectId(userId),
                    dateOfReques: Date.now(),
                    dateOfReturn: dateOfReturn,
                };
                const requestInstrument = yield mongodbConnector.createDcoument("requestInstrument", requestInstrumentInfo);
                if (!requestInstrument) {
                    return res.status(400).send({
                        message: "Request Failed",
                    });
                }
                return res.status(200).send({
                    message: "Request Successfull",
                });
            }
        }
        catch (error) {
            return res.status(500).send({
                message: "Internal Server Error",
            });
        }
    }));
    router.delete("/submit/instrument/:id", auth_1.authUSer, (req, res) => __awaiter(this, void 0, void 0, function* () {
        const userId = req.userInfo.id;
        const { id } = req.params;
        try {
            const instrumentDetails = yield mongodbConnector.getDocument("IssuedInstrument", { _id: new mongodb_1.ObjectId(id), studentId: new mongodb_1.ObjectId(userId) });
            console.log("ISSUED INSTRUMENT : ", instrumentDetails);
            if (!instrumentDetails) {
                return res.status(404).send({
                    message: "Instrument Not Found",
                });
            }
            const deletedIssuedInstrument = yield mongodbConnector.deleteDocument("IssuedInstrument", { _id: new mongodb_1.ObjectId(id) });
            if (!deletedIssuedInstrument) {
                return res.status(400).send({
                    message: "Instrument submission failed",
                });
            }
            const instrumentInfo = yield mongodbConnector.getDocument("Instrument", {
                _id: new mongodb_1.ObjectId(instrumentDetails.instrumentId),
            });
            instrumentInfo.available = instrumentInfo.available + 1;
            console.log("INSTRUMENT INFO ", instrumentInfo);
            const saveInstrument = yield mongodbConnector.saveDocument("Instrument", { _id: new mongodb_1.ObjectId(instrumentInfo._id) }, instrumentInfo);
            return res.status(200).send({
                message: "Instrument submission successfull",
            });
        }
        catch (error) {
            return res.status(500).send({
                message: "Internal Server Error",
            });
        }
    }));
    router.get("/get/issued/instrument/:id", auth_1.authUSer, (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const alreadyIssued = yield mongodbConnector.getDocument("IssuedInstrument", {
                instrumentId: new mongodb_1.ObjectId(id),
            });
            if (!alreadyIssued) {
                return res.status(404).send({
                    message: "You haven't issued this instrument",
                });
            }
            return res.status(200).send({
                message: "Instrument fetched successfull",
                instrument: alreadyIssued,
            });
        }
        catch (error) {
            return res.status(501).send({
                message: "Internal Server Error",
            });
        }
    }));
    router.get("/get/all/issued/instrument", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const issuedInstrument = yield mongodbConnector.getDocuments("IssuedInstrument", {});
            if (!issuedInstrument) {
                return res.status(404).send({
                    message: "Instrument not found",
                });
            }
            return res.status(200).send({
                message: "Instrument fetched",
                issuedInstrument,
            });
        }
        catch (error) {
            return res.status(500).send({
                message: error.message,
            });
        }
    }));
}
