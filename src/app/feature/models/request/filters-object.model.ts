export default class FiltersObjectModel {
    searchWord: String = '';
    objectTypes: any[] = [];

    constructor() {
    }

    setSearchWord(word: String) {
        this.searchWord = word;
    }

    setObjectTypes(objectTypes: any[]) {
        this.objectTypes = objectTypes;
    }
}