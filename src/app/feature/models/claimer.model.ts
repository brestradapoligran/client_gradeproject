export default class ClaimerModel {
    name: string;
    lastName: string;
    document: string;
    documentType: string;
    contact: string;
    userType: string;

    constructor(name: string, lastName: string, document: string, documentType: string, contact: string, userType: string) {
        this.name = name;
        this.lastName = lastName;
        this.document = document;
        this.documentType = documentType;
        this.contact = contact;
        this.userType = userType;
    }
}