export class RequestInstrument{

    instrumentId:string
    studentId:string
    dateOfRequest:Date
    dateOfReturn : Date

    constructor(instrumentId:string,
        studentId:string,
        dateOfRequest:Date,
        dateOfReturn :Date
    ){

            this.instrumentId = instrumentId;
            this.studentId = studentId;
            this.dateOfRequest = dateOfRequest
            this.dateOfReturn = dateOfReturn
        }

        static getDefaultRequestInstrument(){

            return new RequestInstrument(
                "",
                "",
                new Date(Date.now()),
                new Date(Date.now())
            )
        }

        static JsonToClass(requestInstrumenObject:RequestInstrument){

            let requestInstrument:RequestInstrument = null;

            if(requestInstrumenObject){

                requestInstrument.instrumentId = requestInstrumenObject.instrumentId ?? "";
                requestInstrument.studentId = requestInstrumenObject.studentId ?? "";
                requestInstrument.dateOfRequest = requestInstrumenObject.dateOfRequest ?? new Date(Date.now());
                requestInstrument.dateOfReturn = requestInstrumenObject.dateOfReturn ?? new Date(Date.now());
                
            }

            return requestInstrument
        }

        
}