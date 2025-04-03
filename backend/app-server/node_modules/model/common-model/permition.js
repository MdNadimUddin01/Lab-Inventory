"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permition = void 0;
class Permition {
    constructor(userId, canAddInstrument = false, canEditInstrument = false, issueAnInstrument = false, requestForIssue = false, deleteAnInstrument = false) {
        this.canAddInstrument = canAddInstrument;
        this.canEditInstrument = canEditInstrument;
        this.deleteAnInstrument = deleteAnInstrument;
        this.issueAnInstrument = issueAnInstrument;
        this.requestForIssue = requestForIssue;
        this.userId = userId;
    }
    static getDefaultPermition() {
        return new Permition("");
    }
    static JsonToClass(permitionObject) {
        let permition = null;
        if (permitionObject) {
            permition.canAddInstrument = permitionObject.canAddInstrument ?? false;
            permition.canEditInstrument = permitionObject.canEditInstrument ?? false;
            permition.deleteAnInstrument = permitionObject.deleteAnInstrument ?? false;
            permition.issueAnInstrument = permitionObject.issueAnInstrument ?? false;
            permition.requestForIssue = permitionObject.requestForIssue ?? false;
            permition.userId = permitionObject.userId ?? "";
        }
        return permition;
    }
}
exports.Permition = Permition;
