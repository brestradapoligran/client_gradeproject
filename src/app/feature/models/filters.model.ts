export default class FiltersModel {
    objectTypes: string[];
    objectStatuses: string[];

    constructor(objectTypes: string[], objectStatuses: string[]) {
        this.objectTypes = objectTypes;
        this.objectStatuses = objectStatuses;
    }
}