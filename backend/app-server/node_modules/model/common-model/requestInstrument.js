"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestInstrument = void 0;
class RequestInstrument {
    constructor(instrumentId, studentId, dateOfRequest) {
        this.instrumentId = instrumentId;
        this.studentId = studentId;
        this.dateOfRequest = dateOfRequest;
    }
    static getDefaultRequestInstrument() {
        return new RequestInstrument("", "", new Date(Date.now()));
    }
    static JsonToClass(requestInstrumenObject) {
        let requestInstrument = null;
        if (requestInstrumenObject) {
            requestInstrument.instrumentId = requestInstrumenObject.instrumentId ?? "";
            requestInstrument.studentId = requestInstrumenObject.studentId ?? "";
            requestInstrument.dateOfRequest = requestInstrumenObject.dateOfRequest ?? new Date(Date.now());
        }
        return requestInstrument;
    }
}
exports.RequestInstrument = RequestInstrument;
