export class RequestInstrument{

    instrumentId:string
    studentId:string
    dateOfRequest:Date

    constructor(instrumentId:string,
        studentId:string,
        dateOfRequest:Date){

            this.instrumentId = instrumentId;
            this.studentId = studentId;
            this.dateOfRequest = dateOfRequest
        }

        static getDefaultRequestInstrument(){

            return new RequestInstrument(
                "",
                "",
                new Date(Date.now())
            )
        }

        static JsonToClass(requestInstrumenObject:RequestInstrument){

            let requestInstrument:RequestInstrument = null;

            if(requestInstrumenObject){

                requestInstrument.instrumentId = requestInstrumenObject.instrumentId ?? "";
                requestInstrument.studentId = requestInstrumenObject.studentId ?? "";
                requestInstrument.dateOfRequest = requestInstrumenObject.dateOfRequest ?? new Date(Date.now());
            }

            return requestInstrument
        }

        
}