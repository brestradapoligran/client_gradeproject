export default class LoginModel{
    private email: String;
    private pass: String;

    constructor(email:String,pass:String){
        this.email = email;
        this.pass = pass;
    }

    getEmail(){
        return this.email;
    }

    setEmail(email:String){
        this.email = email;
    }

    getPass(){
        return this.pass;
    }
    
    setPass(pass:String){
        this.pass = pass;
    }
}