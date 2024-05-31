// Model service - cria funções para manipulação dos dados vindos da model user

const User = require('./user');
let NEXT_ID = 1;
// LSP - lista pode ser substituída por model sem prejuízos adicionais
let records = [
    {id:NEXT_ID++,name:"Beatriz",email:"bia@test",password:"123456"}
];

class UserService{

    findAll(){
        return records;
    }

    findById(id){
        return records.find((record)=> record.id == id);
    }

    // DIP - funções só dependem da model principal, sem abstrações externas

    insert(name,email,password){
        const user = new User(NEXT_ID++,name,email,password);
        records.push(user);
        return user;
    }
    update(id,name,email,password){
        records = records.map((record)=>{
            if(record.id == id){
                record.name = name;
                record.email = email;
                record.password = password;
            }
            return record;
        })
        return new User(id,name,email,password);
    }
    remove(id){
        const oldSize = records.length;
        records = records.filter((record)=> record.id != id);
        return oldSize > records.length;
    }
}

module.exports = new UserService();