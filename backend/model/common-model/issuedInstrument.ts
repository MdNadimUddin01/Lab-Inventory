export class IssuedInstrument {
  instrumentId: string;
  studentId: string;
  quantity: number;
  dateOfIssue: Date;
  dateOfReturn: Date;
  totalCost: number;
  costPaid: number;

  constructor(
    instrumentId: string,
    studentId: string,
    quantity: number,
    dateOfIssue: Date,
    dateOfReturn: Date,
    totalCost: number,
    costPaid: number
  ) {
    this.instrumentId = instrumentId;
    this.studentId = studentId;
    this.quantity = quantity;
    this.dateOfIssue = dateOfIssue;
    this.dateOfReturn = dateOfReturn;
    this.totalCost = totalCost;
    this.costPaid = costPaid;
  }

  static getDefaultIssuedInstrument() {
    return new IssuedInstrument(
      "",
      "",
      0,
      new Date(Date.now()),
      new Date(Date.now()),
      0,
      0
    );
  }

  static JsonToClass(issuedInstrumentObject: IssuedInstrument) {
    let issuedInstrument: IssuedInstrument = null;

    if (issuedInstrumentObject) {
        issuedInstrument.instrumentId = issuedInstrumentObject.instrumentId ?? "";
        issuedInstrument.studentId = issuedInstrumentObject.studentId ?? "";
        issuedInstrument.quantity = issuedInstrumentObject.quantity ?? 0;
        issuedInstrument.dateOfIssue = issuedInstrumentObject.dateOfIssue ?? new Date(Date.now());
        issuedInstrument.dateOfReturn = issuedInstrumentObject.dateOfReturn ?? new Date(Date.now());
        issuedInstrument.totalCost = issuedInstrumentObject.totalCost ?? 0;
        issuedInstrument.costPaid = issuedInstrumentObject.costPaid ?? 0;
    }
  }
}
