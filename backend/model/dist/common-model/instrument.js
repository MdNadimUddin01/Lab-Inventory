"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instrument = exports.statuses = exports.categories = void 0;
var categories;
(function (categories) {
    categories["allEquipment"] = "All Equipment";
    categories["chemistryEquipment"] = "Chemistry Equipment";
    categories["biologyEquipment"] = "Biology Equipment";
    categories["computerHardware"] = "Computer Hardware";
    categories["electronics"] = "Electronics";
    categories["physicalApparatus"] = "Physics Apparatus";
    categories["generalTools"] = "General Tools";
})(categories || (exports.categories = categories = {}));
;
var statuses;
(function (statuses) {
    statuses["allStatus"] = "All Statuses";
    statuses["available"] = "Available";
    statuses["inUse"] = "In Use";
    statuses["underMaintenance"] = "Under Maintenance";
    statuses["damaged"] = "Damaged";
    statuses["calibrationRequired"] = "Calibration Required";
})(statuses || (exports.statuses = statuses = {}));
;
class Instrument {
    constructor(instrumentName, quantity, costPerPeice, companyType, category = categories.allEquipment, department, location, lastMaintenance, nextMaintenance, purchaseDate, available, status = statuses.allStatus) {
        this.instrumentName = instrumentName;
        this.quantity = quantity;
        this.costPerPeice = costPerPeice;
        this.companyType = companyType;
        this.category = category;
        this.department = department;
        this.location = location;
        this.lastMaintenance = lastMaintenance;
        this.nextMaintenance = nextMaintenance;
        this.purchaseDate = purchaseDate;
        this.available = available;
        this.status = status;
    }
    static getDefaultInstrument() {
        return new Instrument("", 0, 0, "", categories.allEquipment, "", "", new Date(Date.now()), new Date(Date.now()), new Date(Date.now()), 0);
    }
    static JsonToClass(instrumentObject) {
        let instrument = null;
        if (instrumentObject) {
            instrument.instrumentName = instrumentObject.instrumentName ?? "";
            instrument.quantity = instrumentObject.quantity ?? 0;
            instrument.costPerPeice = instrumentObject.costPerPeice ?? 0;
            instrument.companyType = instrumentObject.companyType ?? "";
            instrument.category = instrumentObject.category ?? categories.allEquipment;
            instrument.department = instrumentObject.department ?? "";
            instrument.location = instrumentObject.location ?? "";
            instrument.lastMaintenance = instrumentObject.lastMaintenance ?? new Date(Date.now());
            instrument.nextMaintenance = instrumentObject.nextMaintenance ?? new Date(Date.now());
            instrument.purchaseDate = instrumentObject.purchaseDate ?? new Date(Date.now());
            instrument.available = instrumentObject.available;
            instrument.status = instrumentObject.status ?? statuses.allStatus;
        }
        return instrument;
    }
}
exports.Instrument = Instrument;
