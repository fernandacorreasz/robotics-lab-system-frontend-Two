describe('Testes da Biblioteca de Componentes', () => {
    const componentsResponse = {
        "content": [
            {
                "id": "e4ea4fc2-e282-4200-90c9-ddf5446d2952",
                "componentId": "26742b39-0171-4465-9e8d-b7c606d517ed",
                "name": "Teste componente para atividade",
                "serialNumber": "02555",
                "description": "dd",
                "quantity": 3,
                "tutorialLink": "https://youtu.be/sv9dDtYnE1g?si=FtXli4n4vpl6PCza",
                "projectIdeas": "componente interessante",
                "librarySuggestions": "Sugestão de Biblioteca",
                "subCategoryId": "28598648-6f6d-4db9-a688-9c959e325870",
                "subCategoryName": "ultrassonico",
                "categoryId": "a748b99f-0ed6-4eef-903f-c4302cbf4280",
                "categoryName": "sensores"
            }
        ],
        "pageable": {
            "pageNumber": 0,
            "pageSize": 10,
            "sort": {
                "empty": true,
                "sorted": false,
                "unsorted": true
            },
            "offset": 0,
            "unpaged": false,
            "paged": true
        },
        "totalElements": 1,
        "totalPages": 1,
        "last": true,
        "size": 10,
        "number": 0,
        "sort": {
            "empty": true,
            "sorted": false,
            "unsorted": true
        },
        "numberOfElements": 1,
        "first": true,
        "empty": false
    }


    const loansDetailsResponse = [
        {
            id: "b73244f1-9438-4f69-a417-adf4e581e610",
            name: "Resistor",
            serialNumber: "12355ss5455ss6",
            description: "Resistor",
            totalQuantity: 100,
            requestedQuantity: 8,
            authorizedQuantity: 1,
            borrowedQuantity: 0,
            availableQuantity: 91
        },
        {
            id: "1861fc64-3afa-4bdc-aee6-aaa87bf6d243",
            name: "arduino",
            serialNumber: "555555588",
            description: "arduino",
            totalQuantity: 2,
            requestedQuantity: 2,
            authorizedQuantity: 0,
            borrowedQuantity: 0,
            availableQuantity: 0
        }
    ];

    const loadComponentDetails = {
        "id": "e4ea4fc2-e282-4200-90c9-ddf5446d2952",
        "componentId": "26742b39-0171-4465-9e8d-b7c606d517ed",
        "name": "Teste componente para atividade",
        "serialNumber": "02555",
        "description": "dd",
        "quantity": 3,
        "tutorialLink": "https://youtu.be/sv9dDtYnE1g?si=FtXli4n4vpl6PCza",
        "projectIdeas": "componente interessante",
        "librarySuggestions": "Sugestão de Biblioteca",
        "subCategoryId": "28598648-6f6d-4db9-a688-9c959e325870",
        "subCategoryName": "ultrassonico",
        "categoryId": "a748b99f-0ed6-4eef-903f-c4302cbf4280",
        "categoryName": "sensores"
    }

    beforeEach(() => {
        cy.loginEstudante();
        cy.visit('/student');
        cy.get('span.ant-menu-title-content')
            .contains('Biblioteca de Componentes')
            .click();

        cy.intercept('GET', 'http://4.196.97.77:9002/api/v1/components/all-with-associations?page=0&size=10', {
            statusCode: 200,
            body: componentsResponse
        }).as('getComponents');

        cy.intercept('GET', 'http://4.196.97.77:9002/api/v1/loans/details?page=0&size=10', {
            statusCode: 200,
            body: loansDetailsResponse
        }).as('getDetails');

        cy.intercept('GET', 'http://4.196.97.77:9002/api/v1/components/e4ea4fc2-e282-4200-90c9-ddf5446d2952/with-associations', {
            statusCode: 200,
            body: loadComponentDetails
        }).as('getComponentDetails');
    });

    it('Deve abrir a página e carregar as informações básicas', () => {
        cy.wait('@getComponents').its('response.statusCode').should('eq', 200);
        cy.wait('@getDetails').its('response.statusCode').should('eq', 200);

        cy.get('table').should('exist');
        cy.get('table tbody tr').should('have.length', 4);
    });

    it('Entrar em um componente e testar funcionalidades', () => {
        cy.wait('@getComponents').its('response.statusCode').should('eq', 200);
        cy.wait('@getDetails').its('response.statusCode').should('eq', 200);

        cy.get(':nth-child(7) > .ant-btn').click()
        cy.wait('@getComponentDetails').its('response.statusCode').should('eq', 200);
        cy.get('.ant-breadcrumb-link > span').contains('e4ea4fc2-e282-4200-90c9-ddf5446d2952')
        cy.get('h2').contains('Teste componente para atividade')

        cy.get(':nth-child(2) > .ant-card-body > .ant-row > :nth-child(2) > .ant-btn').click();
        cy.wait(1000)
        cy.get('iframe')
            .should('have.attr', 'src')
            .and('include', 'https://www.youtube.com/embed/sv9dDtYnE1g');


        cy.get('[style="margin-top: 10px; text-align: left;"] > p').should('not.exist')
        cy.get(':nth-child(3) > .ant-card-body > .ant-row > :nth-child(2) > .ant-btn').click();
        cy.get('[style="margin-top: 10px; text-align: left;"] > p').should('be.visible')
            .should('have.text', 'componente interessante');

        cy.get(':nth-child(4) > .ant-card-body > [style="margin-top: 10px; text-align: left;"] > p').should('not.exist')
        cy.get(':nth-child(4) > .ant-card-body > .ant-row > :nth-child(2) > .ant-btn').click();
        cy.get(':nth-child(4) > .ant-card-body > [style="margin-top: 10px; text-align: left;"] > p').should('be.visible')
            .should('have.text', 'Sugestão de Biblioteca');
    });
});
