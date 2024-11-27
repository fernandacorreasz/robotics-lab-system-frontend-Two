describe('Testes da página de Login', () => {
  it('Deve acessar a página de login', () => {
    cy.visit('');
    cy.get('#email').should('exist');
    cy.get('#password').should('exist');
    cy.get('[style="margin-bottom: 10px; font-size: 14px;"] > a').should('exist');
    cy.contains('Esqueceu sua senha? Clique aqui');
    cy.contains('Não tem uma conta? Clique aqui para Cadastrar');
    cy.get('.ant-btn > span').should('exist');
  });

  it('Deve gerar erro de credenciais inválidas', () => {
    cy.visit('/');
    cy.get('#email').type('teste@teste.com')
    cy.get('#password').type('senhainvalida')
    cy.get('.ant-btn > span').click();
    cy.get('.ant-message-notice-content').contains('Error: Incorrect email or password.')
  });

  it('Deve mostrar a senha oculta', () => {
    cy.visit('/');
    cy.get('#email').type('teste@teste.com')
    cy.get('#password').type('senhainvalida')
    cy.get('.ant-input-suffix').click();
    cy.get('#password').should('have.value', 'senhainvalida');
  });

  it('Deve manter a senha oculta', () => {
    cy.visit('/');
    cy.get('#email').type('teste@teste.com')
    cy.get('#password').type('senhainvalida')
    cy.get('#password').should('have.attr', 'type', 'password')
  });

  it('Deve efetuar o login e preencher o localStorage', () => {
    cy.visit('/');
    cy.get('#email').type('maria@catolicasc.edu.br')
    cy.get('#password').type('senha123')
    cy.get('.ant-btn > span').click();
    cy.get('.ant-message-notice-content').contains('Login realizado com sucesso')

    cy.window().then((win) => {
      expect(win.localStorage.getItem('email')).to.equal('maria@catolicasc.edu.br');
      expect(win.localStorage.getItem('permissionLevel')).to.equal('1');
      expect(win.localStorage.getItem('name')).to.equal('Maria Eduarda');
      expect(win.localStorage.getItem('userId')).to.equal('bc791b13-0f5f-4f64-af25-9c6764f2ce17');
    });
  });

  // it('Deve efetuar o login2', () => {
  //   cy.loginEstudante();
  //   cy.visit('/student');
  //   cy.window().then((win) => {
  //     expect(win.localStorage.getItem('email')).to.equal('maria@catolicasc.edu.br');
  //     expect(win.localStorage.getItem('permissionLevel')).to.equal('1');
  //     expect(win.localStorage.getItem('name')).to.equal('maria');
  //     expect(win.localStorage.getItem('userId')).to.equal('845a6d46-d06f-48ae-a888-5181c5eaee4a');
  //   });
  // });
});
