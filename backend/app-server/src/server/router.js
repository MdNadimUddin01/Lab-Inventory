"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterA = RouterA;
const user_1 = require("./routes/user");
const instrument_1 = require("./routes/instrument");
function RouterA(router, mongodbConnector) {
    (0, user_1.user)(router, mongodbConnector);
    (0, instrument_1.instrument)(router, mongodbConnector);
}
