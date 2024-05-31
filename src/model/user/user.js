// Model user - define os dados base a serem usados pelas outras classes

// OCP - classe está disponível para alterações externas, mas restrita para internas
class User{ 
    constructor(id,name,email,password){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
module.exports = User;