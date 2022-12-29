export default class FiltersObjectModel {
    searchWord: String = '';
    objectTypes: any[] = [];
    objectStatuses: any[] = [];

    constructor() {
    }

    setSearchWord(word: String) {
        this.searchWord = word;
    }

    setObjectTypes(objectTypes: any[]) {
        this.objectTypes = objectTypes;
    }

    setObjectStatuses(objectStatuses: any[]) {
        this.objectStatuses = objectStatuses;
    }
}