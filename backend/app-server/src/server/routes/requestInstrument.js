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
exports.requestInstrument = requestInstrument;
const auth_1 = require("../middleware/auth");
const mongodb_1 = require("mongodb");
function requestInstrument(router, mongodbConnector) {
    router.get("/get/requested/instrument/:id", auth_1.authUSer, (req, res) => __awaiter(this, void 0, void 0, function* () {
        const userId = req.userinfo.id;
        const { id } = req.params;
        try {
            const requestedInstrument = yield mongodbConnector.getDocument("RequestInstrument", { instrumentId: new mongodb_1.ObjectId(id) });
            if (!requestedInstrument) {
                return res.status(404).send({
                    message: "You haven't requested this instrument",
                });
            }
            return res.status(200).send({
                message: "Instrument fetched successfull",
                instrument: requestedInstrument,
            });
        }
        catch (error) {
            return res.status(500).send({
                message: "Internal Server Error",
            });
        }
    }));
    router.get("/get/all/requested/instrument", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const requestedInstrument = yield mongodbConnector.getAllInstrument("RequestInstrument", {});
            if (!requestedInstrument) {
                return res.status(404).send({
                    message: "Instrument not found",
                });
            }
            return res.status(200).send({
                message: "Instrument fetched",
                requestedInstrument,
            });
        }
        catch (error) {
            return res.status(500).send({
                message: error.message,
            });
        }
    }));
}
