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
exports.instrument = instrument;
const auth_1 = require("../middleware/auth");
const checkPermission_1 = require("../middleware/checkPermission");
const mongodb_1 = require("mongodb");
function instrument(router, mongodbConnector) {
    router.post("/create/instrument", auth_1.authUSer, (0, checkPermission_1.checkPermission)("canAddInstrument", mongodbConnector), (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { id } = req.userInfo;
        try {
            const { instrument } = req.body;
            instrument.userId = id;
            console.log("instrument : ", instrument);
            const addInstrumentStatus = yield mongodbConnector.createDcoument("Instrument", instrument);
            if (!addInstrumentStatus) {
                return res.status(400).json({
                    message: `${instrument.instrumentName} failed to add in lab`,
                });
            }
            return res.status(200).send({
                message: `${instrument.instrumentName} added in Lab`,
                addInstrumentStatus,
            });
        }
        catch (error) {
            return res.status(500).send({
                message: error.message,
            });
        }
    }));
    router.get("/get/instrument/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            if (!id) {
                return res.status(400).send("Inventory Id is required");
            }
            const instrument = yield mongodbConnector.getDocument("Instrument", {
                _id: new mongodb_1.ObjectId(id),
            });
            console.log("INSTRUKMENT : ", instrument);
            if (!instrument) {
                return res.status(404).send({
                    message: "Instrument not found",
                });
            }
            return res.status(200).send({
                message: "Instrument fetched",
                instrument,
            });
        }
        catch (error) {
            return res.status(500).send({
                message: error.message,
            });
        }
    }));
    router.get("/get/all/instrument", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const instrument = yield mongodbConnector.getDocuments("Instrument", {});
            if (!instrument) {
                return res.status(404).send({
                    message: "Instrument not found",
                });
            }
            return res.status(200).send({
                message: "Instrument fetched",
                instrument,
            });
        }
        catch (error) {
            return res.status(500).send({
                message: error.message,
            });
        }
    }));
    router.put("/update/instrument/:id", auth_1.authUSer, (0, checkPermission_1.checkPermission)("canEditInstrument", mongodbConnector), (req, res) => __awaiter(this, void 0, void 0, function* () {
        const instrument = req.body.instrument;
        const id = req.params.id;
        instrument.userId = req.userInfo.id;
        try {
            const existingInstrument = yield mongodbConnector.getDocument("Instrument", { _id: new mongodb_1.ObjectId(id) });
            console.log("Instrument existing : ", existingInstrument);
            if (!existingInstrument) {
                return res.status(404).send({
                    message: "Instrument not found",
                });
            }
            delete instrument._id;
            const data = yield mongodbConnector.saveDocument("Instrument", { _id: new mongodb_1.ObjectId(id) }, instrument);
            const updatedInstrument = yield mongodbConnector.getDocument("Instrument", { _id: new mongodb_1.ObjectId(id) });
            console.log("updated Instrument : ", updatedInstrument);
            return res.status(200).send({
                message: "Instrument updated",
                updatedInstrument,
            });
        }
        catch (error) {
            console.log("ERROR : ", error.message);
            return res.status(500).send({
                message: error.message,
            });
        }
    }));
    router.delete("/delete/instrument/:id", auth_1.authUSer, (0, checkPermission_1.checkPermission)("canDeleteInstrument", mongodbConnector), (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const existingInstrument = yield mongodbConnector.getDocument("Instrument", { _id: new mongodb_1.ObjectId(id) });
            if (!existingInstrument) {
                return res.status(404).send({
                    message: "Instrument not found",
                });
            }
            const instrumentInfo = yield mongodbConnector.deleteDocument("Instrument", { _id: new mongodb_1.ObjectId(id) });
            return res.status(200).send({
                message: `${existingInstrument.instrumentName} is Succesfully deleted`,
            });
        }
        catch (error) {
            return res.status(500).send({
                message: "Internal Server Error",
            });
        }
    }));
}
