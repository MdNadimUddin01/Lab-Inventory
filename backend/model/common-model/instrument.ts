export enum categories {
  allEquipment = "All Equipment",
  chemistryEquipment = "Chemistry Equipment",
  biologyEquipment = "Biology Equipment",
  computerHardware = "Computer Hardware",
  electronics = "Electronics",
  physicalApparatus = "Physics Apparatus",
  generalTools = "General Tools",
}

export enum statuses {
  allStatus = "All Statuses",
  available = "Available",
  inUse = "In Use",
  underMaintenance = "Under Maintenance",
  damaged = "Damaged",
  calibrationRequired = "Calibration Required",
}

export class Instrument {
  instrumentName: string;
  quantity: number;
  costPerPeice: number;
  companyType: string;
  category: categories;
  department: string;
  location: string;
  lastMaintenance: Date;
  nextMaintenance: Date;
  purchaseDate: Date;
  available: number;
  status: statuses;

  constructor(
    instrumentName: string,
    quantity: number,
    costPerPeice: number,
    companyType: string,
    category: categories = categories.allEquipment,
    department: string,
    location: string,
    lastMaintenance: Date,
    nextMaintenance: Date,
    purchaseDate: Date,
    available: number,
    status: statuses = statuses.allStatus
  ) {
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

  static getDefaultInstrument(): Instrument {
    return new Instrument(
      "",
      0,
      0,
      "",
      categories.allEquipment,
      "",
      "",
      new Date(Date.now()),
      new Date(Date.now()),
      new Date(Date.now()),
      0
    );
  }

  static JsonToClass(instrumentObject: Instrument) {
    let instrument: Instrument = null;

    if (instrumentObject) {
      instrument.instrumentName = instrumentObject.instrumentName ?? "";
      instrument.quantity = instrumentObject.quantity ?? 0;
      instrument.costPerPeice = instrumentObject.costPerPeice ?? 0;
      instrument.companyType = instrumentObject.companyType ?? "";
      instrument.category =
        instrumentObject.category ?? categories.allEquipment;
      instrument.department = instrumentObject.department ?? "";
      instrument.location = instrumentObject.location ?? "";
      instrument.lastMaintenance =
        instrumentObject.lastMaintenance ?? new Date(Date.now());
      instrument.nextMaintenance =
        instrumentObject.nextMaintenance ?? new Date(Date.now());
      instrument.purchaseDate =
        instrumentObject.purchaseDate ?? new Date(Date.now());
      instrument.available = instrumentObject.available;
      instrument.status = instrumentObject.status ?? statuses.allStatus;
    }

    return instrument;
  }
}
