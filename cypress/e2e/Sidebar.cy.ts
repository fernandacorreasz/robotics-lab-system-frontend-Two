describe('Testes da sidebar', () => {
    it('Deve mostrar as opções liberadas ao perfil de estudante', () => {
        cy.loginEstudante();
        cy.visit('/student');

        const menuItems = ['Logout', 'Dashboard', 'Atividades', 'Biblioteca de Componentes', 'Fórum'];
        menuItems.forEach(item => {
            cy.get('span.ant-menu-title-content')
                .contains(item)
                .should('exist');

            if (item != 'Logout') {
                cy.get('span.ant-menu-title-content')
                    .contains(item)
                    .click();

                cy.get('span.ant-breadcrumb-link')
                    .find('span')
                    .contains(item)
                    .should('exist');
            }
        });
    });

    it('Deve mostrar as opções liberadas ao perfil de laboratorista', () => {
        cy.loginLaboratorista();
        cy.visit('/laboratorist');

        const menuItems = ['Logout', 'Gerenciar Atividades', 'Gerenciar Estoque', 'Gerenciar Empréstimos', 'Fórum'];
        menuItems.forEach(item => {
            cy.get('span.ant-menu-title-content')
                .contains(item)
                .should('exist');

            if (item != 'Logout') {
                cy.get('span.ant-menu-title-content')
                    .contains(item)
                    .click();

                cy.get('span.ant-breadcrumb-link')
                    .find('span')
                    .contains(item)
                    .should('exist');
            }
        });
    });
//teste
    it('Deve mostrar as opções liberadas ao perfil de admin', () => {
        cy.loginAdmin();
        cy.visit('/admin');

        const menuItems = ['Logout', 'Gerenciar Usuários', 'Relatórios de Desempenho', 'Fórum-SAC'];
        menuItems.forEach(item => {
            cy.get('span.ant-menu-title-content')
                .contains(item)
                .should('exist');

            if (item != 'Logout') {
                cy.get('span.ant-menu-title-content')
                    .contains(item)
                    .click();

                cy.get('span.ant-breadcrumb-link')
                    .find('span')
                    .contains(item)
                    .should('exist');
            }
        });
    });
});
