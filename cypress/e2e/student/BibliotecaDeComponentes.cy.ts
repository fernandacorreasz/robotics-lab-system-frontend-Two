describe('Testes da Biblioteca de Componentes', () => {
    const componentsResponse = {
        content: [
            {
                id: 'b73244f1-9438-4f69-a417-adf4e581e610',
                componentId: '1fe58c33-bb7a-4e88-8415-f50c1b0f0791',
                name: 'Resistor',
                serialNumber: '12355ss5455ss6',
                description: 'Resistor',
                quantity: 100,
                subCategoryId: '00414a60-9133-4e9a-8549-818141a800a3',
                subCategoryName: 'sss',
                categoryId: '4b19787e-51d6-476d-af3b-d8fe6a1418f0',
                categoryName: 'eletronico'
            },
            {
                id: '1861fc64-3afa-4bdc-aee6-aaa87bf6d243',
                componentId: 'e560d02d-bfad-4c9d-befb-a98e8f68c504',
                name: 'arduino',
                serialNumber: '555555588',
                description: 'arduino',
                quantity: 2,
                subCategoryId: '8f3f6967-cd1a-4c8a-8f43-88084bb6a003',
                subCategoryName: 'arduino',
                categoryId: 'b50a85af-5672-4ff1-afd4-d03f4af0316e',
                categoryName: 'placas'
            }
        ],
        pageable: {
            pageNumber: 0,
            pageSize: 10,
            sort: { empty: true, sorted: false, unsorted: true },
            offset: 0,
            unpaged: false,
            paged: true
        },
        totalElements: 3,
        totalPages: 1,
        last: true,
        size: 10,
        number: 0,
        sort: { empty: true, sorted: false, unsorted: true },
        numberOfElements: 3,
        first: true,
        empty: false
    };

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
    });

    it('Deve abrir a página e carregar as informações básicas', () => {
        cy.wait('@getComponents').its('response.statusCode').should('eq', 200);
        cy.wait('@getDetails').its('response.statusCode').should('eq', 200);

        cy.get('table').should('exist');
        cy.get('table tbody tr').should('have.length', 5);
    });
    
    it('Deve abrir a página e carregar as informações básicas', () => {
        cy.wait('@getComponents').its('response.statusCode').should('eq', 200);
        cy.wait('@getDetails').its('response.statusCode').should('eq', 200);

        cy.get('table').should('exist');
        cy.get('table tbody tr').should('have.length', 5);
    });
});
