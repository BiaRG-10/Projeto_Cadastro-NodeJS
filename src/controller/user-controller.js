// Controller user - cria funções para estabelecer a comunicação com servidor a partir dos dados da model e view

const service = require('../model/user/service-user');
const User = require('../model/user/user');

class UserController {

    // SRP - funções tem apenas uma responsabilidade cada

    remove(request,response){ 
        const {id} = request.params;
        const ok = service.remove(id);
        const message = ok ? "Registro removido com sucesso!" : "Não foi possível remover o registro";
        const users = service.findAll();
        const modelView = {
            message,
            users
        }
        response.render('user/list.html',modelView);
    }

    findAll(request,response){
        const users = service.findAll();
        const modelView = {
            users
        }
        response.render('user/list.html',modelView);
    }
    showForm(request,response){
        const {id} = request.params;
        if(id && id.trim().length > 0){
            const user = service.findById(id) || {id:"novo"};
            const modelView = {
                user
            }
            response.render('user/form.html',modelView);
        }   
    }
    save(request,response){
        const paramsId = request.params.id;
        const {id,name, email, password} = request.body;
        let message = "";
        let user = null;
        if(id && id.trim() == paramsId.trim() && id != "novo"){
            user = service.update(id,name, email, password);
            message = "Registro atualizado com sucesso!";
        }else{
            user = service.insert(name,email,password);
            message = "Registro criado com sucesso!";
        }
        
        const modelView = {
            user,
            message
        }
        response.render('user/form.html',modelView);
    }
}

const controller = new UserController();

// ISP - função chama somente métodos que serão usados

function configure(app){
    app.get('/users',controller.findAll);
    app.get('/users/:id',controller.showForm);
    app.get('/users/:id/remove',controller.remove);
    app.post('/users/:id',controller.save);
}

module.exports = {
    configure
}