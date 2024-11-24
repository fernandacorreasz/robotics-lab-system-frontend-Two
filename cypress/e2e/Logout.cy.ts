describe('Testes da página de Login', () => {
    it('Deve efetuar login com credenciais válidas e validar botão de Logout', () => {
        cy.loginEstudante();
        cy.visit('/student');
        cy.window().then((win) => {
            expect(win.localStorage.getItem('email')).to.equal('maria@catolicasc.edu.br');
            expect(win.localStorage.getItem('permissionLevel')).to.equal('1');
            expect(win.localStorage.getItem('name')).to.equal('maria');
            expect(win.localStorage.getItem('userId')).to.equal('845a6d46-d06f-48ae-a888-5181c5eaee4a');
        });
        cy.get('span.ant-menu-title-content')
            .contains('Logout')
            .should('exist');
    });

    it('Deve efetuar login e efetuar Logout', () => {
        cy.loginEstudante();
        cy.visit('/student');
        cy.get('span.ant-menu-title-content')
            .contains('Logout')
            .click();

        cy.url().should('eq', 'http://localhost:5173/');
        cy.get('#email').should('exist');
        cy.get('#password').should('exist');
    });
});
