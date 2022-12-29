export default class LocalStorage {

    constructor() { }

    setValue(key: string, value: string) {
        localStorage.setItem(key, value);
    }
}