"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterA = RouterA;
const user_1 = require("./routes/user");
const instrument_1 = require("./routes/instrument");
const issuedInstrument_1 = require("./routes/issuedInstrument");
const requestInstrument_1 = require("./routes/requestInstrument");
function RouterA(router, mongodbConnector) {
    (0, user_1.user)(router, mongodbConnector);
    (0, instrument_1.instrument)(router, mongodbConnector);
    (0, issuedInstrument_1.issuedInstrument)(router, mongodbConnector);
    (0, requestInstrument_1.requestInstrument)(router, mongodbConnector);
    // console.log("HELLO : ");
}
