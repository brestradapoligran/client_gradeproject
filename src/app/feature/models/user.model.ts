export default class UserModel {
    id: String;
    name: String;
    lastName: String;
    email: String;
    role: String;

    constructor(id: String, name: String, lastName: String, email: String, role: String) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
    }
}