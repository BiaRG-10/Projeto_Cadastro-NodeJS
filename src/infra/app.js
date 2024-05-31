// Controller app - inicia a execução da aplicação

const path = require('path');
const express = require('express');
const nunjucks = require('nunjucks');
const userController = require('../controller/user-controller');

const app = express();

app.use(express.static(path.join(__dirname,"../../public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
nunjucks.configure(path.join(__dirname,"../view"),{
    autoescape: true,
    express: app,
});

userController.configure(app);

module.exports = app;