export class Permition{

    userId:string
    canAddInstrument:boolean
    canEditInstrument:boolean
    issueAnInstrument:boolean
    requestForIssue:boolean
    canDeleteInstrument:boolean

    constructor(userId:string,
        canAddInstrument:boolean = false,
        canEditInstrument:boolean = false,
        issueAnInstrument:boolean = false,
        requestForIssue:boolean = false,
        canDeleteInstrument:boolean = false){

            this.canAddInstrument = canAddInstrument
            this.canEditInstrument = canEditInstrument
            this.canDeleteInstrument = canDeleteInstrument
            this.issueAnInstrument = issueAnInstrument
            this.requestForIssue = requestForIssue
            this.userId = userId
    }

    static getDefaultPermition(){

        return new Permition(
            ""
        )
    }

    static JsonToClass(permitionObject:Permition){
        let permition:Permition = null

        if(permitionObject){
            permition.canAddInstrument = permitionObject.canAddInstrument ?? false
            permition.canEditInstrument = permitionObject.canEditInstrument ?? false
            permition.canDeleteInstrument = permitionObject.canDeleteInstrument ?? false
            permition.issueAnInstrument = permitionObject.issueAnInstrument ?? false
            permition.requestForIssue = permitionObject.requestForIssue ?? false
            permition.userId = permitionObject.userId ?? "" 
        }

        return permition;

    }
}