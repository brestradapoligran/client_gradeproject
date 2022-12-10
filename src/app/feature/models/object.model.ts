export default class ObjectModel {
    id: string;
    name: string;
    description: string;
    status: string;

    constructor(id: string, name: string, description: string, status: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
    }
}