/// <reference types="cypress" />
Cypress.Commands.add('loginEstudante', (email = 'maria@catolicasc.edu.br', password = 'senha123') => {
    cy.request({
        method: 'POST',
        url: 'https://roboticslabsystem.australiaeast.cloudapp.azure.com:9002/api/v1/auth/login', // Substitua pela rota de login da sua API
        body: { email, password },
    }).then((response) => {
        // Salve o token no localStorage ou cookies, dependendo da implementação da sua aplicação
        window.localStorage.setItem('token', response.body.token);
        window.localStorage.setItem('email', 'maria@catolicasc.edu.br');
        window.localStorage.setItem('permissionLevel', '1');
        window.localStorage.setItem('name', 'maria');
        window.localStorage.setItem('userId', '845a6d46-d06f-48ae-a888-5181c5eaee4a');
    });
});

Cypress.Commands.add('loginLaboratorista', (email = 'miguel@catolicasc.edu.br', password = 'senha123') => {
    cy.request({
        method: 'POST',
        url: 'https://roboticslabsystem.australiaeast.cloudapp.azure.com:9002/api/v1/auth/login', // Substitua pela rota de login da sua API
        body: { email, password },
    }).then((response) => {
        // Salve o token no localStorage ou cookies, dependendo da implementação da sua aplicação
        window.localStorage.setItem('token', response.body.token);
        window.localStorage.setItem('email', 'miguel@catolicasc.edu.br');
        window.localStorage.setItem('permissionLevel', '2');
        window.localStorage.setItem('name', 'miguel');
        window.localStorage.setItem('userId', 'b857e014-c03e-4683-b32a-17211411eee0');
        window.localStorage.setItem('tasks', '[{"id":1,"completed":false,"taskText":"zxc"},{"id":2,"completed":false,"taskText":"asdasasdasd"},{"id":3,"completed":false,"taskText":"asd"},{"id":4,"completed":false,"taskText":"sad"}]');
    });
});

Cypress.Commands.add('loginAdmin', (email = 'miguel@catolicasc.edu.br', password = 'senha123') => {
    cy.request({
        method: 'POST',
        url: 'https://roboticslabsystem.australiaeast.cloudapp.azure.com:9002/api/v1/auth/login', // Substitua pela rota de login da sua API
        body: { email, password },
    }).then((response) => {
        // Salve o token no localStorage ou cookies, dependendo da implementação da sua aplicação
        window.localStorage.setItem('token', response.body.token);
        window.localStorage.setItem('email', 'ADMIN@CATOLICA');
        window.localStorage.setItem('permissionLevel', '3');
        window.localStorage.setItem('name', 'teste123456799');
        window.localStorage.setItem('userId', '5852abf3-f93b-4ced-9283-8aeecbe22820');
        window.localStorage.setItem('tasks', '[{"id":1,"completed":false,"taskText":"zxc"},{"id":2,"completed":false,"taskText":"asdasasdasd"},{"id":3,"completed":false,"taskText":"asd"},{"id":4,"completed":false,"taskText":"sad"}]');
    });
});
