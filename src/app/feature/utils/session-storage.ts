export default class SessionStorage {

    constructor() { }

    setValue(key: string, value: string) {
        sessionStorage.setItem(key, value);
    }
}