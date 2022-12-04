export default class UserModel {
    id: String;
    name: String;
    lastName: String;
    email: String;
    role: String;
    status: Boolean

    constructor(id: String, name: String, lastName: String, email: String, role: String, status: Boolean) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.status = status;
    }

}