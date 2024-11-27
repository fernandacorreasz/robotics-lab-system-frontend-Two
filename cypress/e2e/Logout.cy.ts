/*describe('Testes da página de Login', () => {
    it('Deve efetuar login com credenciais válidas e validar botão de Logout', () => {
        cy.loginEstudante();
        cy.visit('/student');
        cy.window().then((win) => {
            expect(win.localStorage.getItem('email')).to.equal('maria@catolicasc.edu.br');
            expect(win.localStorage.getItem('permissionLevel')).to.equal('1');
            expect(win.localStorage.getItem('name')).to.equal('Maria Eduarda');
            expect(win.localStorage.getItem('userId')).to.equal('bc791b13-0f5f-4f64-af25-9c6764f2ce17');
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
*/