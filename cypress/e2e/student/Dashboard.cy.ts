describe('Testes do Fórum', () => {
    const dashboardResponse = {
        "content": [
            {
                "id": "aecf7786-2f1a-4598-b85d-d711917119fc",
                "activityTitle": "treste",
                "activityDescription": "asdsff",
                "activityStatus": "IN_PROGRESS",
                "timeSpent": 300,
                "startDate": "2024-11-24T03:00:00.000+00:00",
                "endDate": null,
                "userId": "845a6d46-d06f-48ae-a888-5181c5eaee4a",
                "userEmail": "maria@catolicasc.edu.br"
            },
            {
                "id": "5624301c-f0aa-4ed0-a23f-98c16edb0228",
                "activityTitle": "ey",
                "activityDescription": "ert",
                "activityStatus": "IN_PROGRESS",
                "timeSpent": 300,
                "startDate": "2024-11-24T03:00:07.000+00:00",
                "endDate": null,
                "userId": "845a6d46-d06f-48ae-a888-5181c5eaee4a",
                "userEmail": "maria@catolicasc.edu.br"
            },
            {
                "id": "1ff5a341-a404-42fe-939a-4098c1142b9a",
                "activityTitle": "adfwas",
                "activityDescription": "asfa",
                "activityStatus": "COMPLETED",
                "timeSpent": 60,
                "startDate": "2024-11-27T03:00:00.000+00:00",
                "endDate": null,
                "userId": "845a6d46-d06f-48ae-a888-5181c5eaee4a",
                "userEmail": "maria@catolicasc.edu.br"
            },
            {
                "id": "1ff5a341-a404-42fe-939a-4098c1142b9a",
                "activityTitle": "não iniciada",
                "activityDescription": "asfa",
                "activityStatus": "NOT_STARTED",
                "timeSpent": 60,
                "startDate": "2024-11-27T03:00:00.000+00:00",
                "endDate": null,
                "userId": "845a6d46-d06f-48ae-a888-5181c5eaee4a",
                "userEmail": "maria@catolicasc.edu.br"
            }
        ],
        "pageable": {
            "pageNumber": 0,
            "pageSize": 100,
            "sort": {
                "empty": true,
                "sorted": false,
                "unsorted": true
            },
            "offset": 0,
            "paged": true,
            "unpaged": false
        },
        "totalElements": 3,
        "totalPages": 1,
        "last": true,
        "size": 100,
        "number": 0,
        "sort": {
            "empty": true,
            "sorted": false,
            "unsorted": true
        },
        "numberOfElements": 3,
        "first": true,
        "empty": false
    };

    const filterdResponse = {
        "content": [
            {
                "id": "65e35c58-f0a9-4315-9860-472ecdcc2ece",
                "title": "Problema com loop em Java",
                "description": "Estou enfrentando um loop infinito em Java. Alguém pode ajudar?",
                "codeSnippet": "while(true) { System.out.println('Infinite loop'); }",
                "status": "OPEN",
                "creationDate": "2024-11-23T21:14:50.482+00:00",
                "editDate": null,
                "voteCount": 0,
                "userName": "miguel",
                "userId": "b857e014-c03e-4683-b32a-17211411eee0",
                "comments": [
                    {
                        "id": "76f7d9cc-7dc5-434f-b890-15474fc4c159",
                        "content": "Comentário Teste",
                        "codeSnippet": "Códico Teste",
                        "userName": "maria",
                        "userId": "845a6d46-d06f-48ae-a888-5181c5eaee4a"
                    },
                    {
                        "id": "c1728c1d-0780-48e0-961b-75fabc101f75",
                        "content": "Comentário Teste",
                        "codeSnippet": "Códico Teste",
                        "userName": "maria",
                        "userId": "845a6d46-d06f-48ae-a888-5181c5eaee4a"
                    },
                    {
                        "id": "18603e35-4baf-480c-8231-6a6400a1ec71",
                        "content": "Comentário Teste",
                        "codeSnippet": "Códico Teste",
                        "userName": "maria",
                        "userId": "845a6d46-d06f-48ae-a888-5181c5eaee4a"
                    },
                    {
                        "id": "39510906-f1a2-47c5-9209-cc4872c4d7b3",
                        "content": "teste",
                        "codeSnippet": "teste2",
                        "userName": "maria",
                        "userId": "845a6d46-d06f-48ae-a888-5181c5eaee4a"
                    }
                ],
                "tags": [
                    {
                        "id": "11bfdd9a-ae2a-4ce9-9632-ffdfb2de2400",
                        "name": "Java Programming"
                    }
                ]
            },
            {
                "id": "9f7a5afd-4d95-49c5-beea-a3b395422759",
                "title": "Problema com loop em Java",
                "description": "Estou enfrentando um loop infinito em Java. Alguém pode ajudar?",
                "codeSnippet": "while(true) { System.out.println('Infinite loop'); }",
                "status": "OPEN",
                "creationDate": "2024-11-23T21:14:53.749+00:00",
                "editDate": null,
                "voteCount": 0,
                "userName": "miguel",
                "userId": "b857e014-c03e-4683-b32a-17211411eee0",
                "comments": [],
                "tags": [
                    {
                        "id": "11bfdd9a-ae2a-4ce9-9632-ffdfb2de2400",
                        "name": "Java Programming"
                    }
                ]
            },
            {
                "id": "7bbebfbc-247e-4bd1-9cae-70b3772040ac",
                "title": "string",
                "description": "string",
                "codeSnippet": "string",
                "status": "OPEN",
                "creationDate": "2024-11-23T21:14:46.950+00:00",
                "editDate": "2024-11-23T21:25:05.624+00:00",
                "voteCount": 0,
                "userName": "miguel",
                "userId": "b857e014-c03e-4683-b32a-17211411eee0",
                "comments": [
                    {
                        "id": "a8938e7b-efb9-47ef-9108-2fb172710e19",
                        "content": "rety54y",
                        "codeSnippet": "64y765756",
                        "userName": "maria",
                        "userId": "845a6d46-d06f-48ae-a888-5181c5eaee4a"
                    }
                ],
                "tags": [
                    {
                        "id": "11bfdd9a-ae2a-4ce9-9632-ffdfb2de2400",
                        "name": "Java Programming"
                    }
                ]
            },
            {
                "id": "f889d411-5ec3-4b89-9f88-5607f48603c2",
                "title": "er",
                "description": "wr",
                "codeSnippet": "werwe",
                "status": "OPEN",
                "creationDate": "2024-11-24T00:34:08.526+00:00",
                "editDate": null,
                "voteCount": 0,
                "userName": "maria",
                "userId": "845a6d46-d06f-48ae-a888-5181c5eaee4a",
                "comments": [],
                "tags": [
                    {
                        "id": "dee65cdf-e60a-408d-bf0d-d62f7a02f661",
                        "name": "arduino"
                    },
                    {
                        "id": "1f7b823f-e859-4a0e-8213-361c2b0102a5",
                        "name": "er"
                    }
                ]
            },
            {
                "id": "70c81596-508c-48ce-be0e-470783f3814b",
                "title": "Oi",
                "description": "sdfd",
                "codeSnippet": "fd",
                "status": "OPEN",
                "creationDate": "2024-11-24T00:34:29.325+00:00",
                "editDate": null,
                "voteCount": 0,
                "userName": "maria",
                "userId": "845a6d46-d06f-48ae-a888-5181c5eaee4a",
                "comments": [],
                "tags": [
                    {
                        "id": "11bfdd9a-ae2a-4ce9-9632-ffdfb2de2400",
                        "name": "Java Programming"
                    }
                ]
            },
            {
                "id": "8808a57b-886e-40e1-a8c6-3d2d2ea84aa3",
                "title": "arduino falhando",
                "description": "sdfsdf",
                "codeSnippet": "   <Option value=\"title\">Título</Option>\n          <Option value=\"description\">Descrição</Option>\n          <Option value=\"codeSnippet\">Código</Option>\n          <Option value=\"status\">Status</Option>\n          <Option value=\"voteCount\">Votos</Option>\n          <Option value=\"userName\">Usuário</Option>",
                "status": "OPEN",
                "creationDate": "2024-11-24T00:40:45.609+00:00",
                "editDate": null,
                "voteCount": 0,
                "userName": "maria",
                "userId": "845a6d46-d06f-48ae-a888-5181c5eaee4a",
                "comments": [
                    {
                        "id": "bfff0709-7945-41d1-9c84-372a7ce8da89",
                        "content": "etr4t",
                        "codeSnippet": "wrtret",
                        "userName": "maria",
                        "userId": "845a6d46-d06f-48ae-a888-5181c5eaee4a"
                    }
                ],
                "tags": [
                    {
                        "id": "11bfdd9a-ae2a-4ce9-9632-ffdfb2de2400",
                        "name": "Java Programming"
                    },
                    {
                        "id": "322cceff-5fb4-47dc-bf28-7e6434d1baa7",
                        "name": "arduinoteste"
                    }
                ]
            }
        ],
        "pageable": {
            "pageNumber": 0,
            "pageSize": 100,
            "sort": {
                "empty": true,
                "sorted": false,
                "unsorted": true
            },
            "offset": 0,
            "paged": true,
            "unpaged": false
        },
        "totalElements": 6,
        "totalPages": 1,
        "last": true,
        "size": 100,
        "number": 0,
        "sort": {
            "empty": true,
            "sorted": false,
            "unsorted": true
        },
        "numberOfElements": 6,
        "first": true,
        "empty": false
    }

    beforeEach(() => {
        cy.loginEstudante();
        cy.visit('/student');
        cy.get('span.ant-menu-title-content')
            .contains('Dashboard')
            .click();

        cy.intercept('GET', 'http://4.196.97.77:9002/api/v1/activities/all/845a6d46-d06f-48ae-a888-5181c5eaee4a?page=0&size=100', {
            statusCode: 200,
            body: dashboardResponse
        }).as('getDashboardData');
        cy.intercept('POST', 'http://4.196.97.77:9002/api/v1/forum/filter?page=0&size=100', {
            statusCode: 200,
            body: filterdResponse
        }).as('getFilterData');
    });

    it('Entrar na tela e carregar corretamente', () => {
        cy.wait('@getDashboardData').its('response.statusCode').should('eq', 200);
        cy.wait('@getFilterData').its('response.statusCode').should('eq', 200);

        cy.get('ol').should('contain.text', 'Home/student/Dashboard');

        cy.get('.ant-col-18 > h4').contains('🌟 Vamos Descobrir Seus Sucessos!')
    });

    it('Carregar cards', () => {
        cy.wait('@getDashboardData').its('response.statusCode').should('eq', 200);
        cy.wait('@getFilterData').its('response.statusCode').should('eq', 200);

        // Card de Distribuição de Atividades por Status
        cy.get('.ant-card-head-title').should('contain.text', 'Distribuição de Atividades por Status');
        cy.get('text[name="Concluídas"]').should('contain.text', '1');
        cy.get('text[name="Em Progresso"]').should('contain.text', '2');
        cy.get('text[name="Não Iniciadas"]').should('contain.text', '1');
        cy.get('.recharts-layer.recharts-pie-sector').should('have.length', 3);
        cy.get('path[name="Concluídas"]').should('have.attr', 'fill', '#8884d8'); // Cor roxa
        cy.get('path[name="Em Progresso"]').should('have.attr', 'fill', '#82ca9d'); // Cor verde
        cy.get('path[name="Não Iniciadas"]').should('have.attr', 'fill', '#ffc658'); // Cor amarela

        // Card de Contribuições no Fórum
        cy.get('.ant-card-head-title').should('contain.text', 'Contribuições no Fórum');
        cy.get('.recharts-cartesian-axis-tick text').eq(0).should('contain.text', 'Perguntas');
        cy.get('.recharts-cartesian-axis-tick text').eq(1).should('contain.text', 'Comentários');
        cy.get('.recharts-cartesian-axis-tick text').contains('0').should('exist');
        cy.get('.recharts-cartesian-axis-tick text').contains('2').should('exist');
        cy.get('.recharts-cartesian-axis-tick text').contains('4').should('exist');
        cy.get('.recharts-cartesian-axis-tick text').contains('6').should('exist');
        cy.get('.recharts-cartesian-axis-tick text').contains('8').should('exist');
        cy.get('.recharts-bar-rectangle').should('have.length', 2);
        cy.get('path[name="Perguntas"]').invoke('attr', 'height').should('equal', '97.5');
        cy.get('path[name="Comentários"]').invoke('attr', 'height').should('equal', '195');
        cy.get('path[name="Perguntas"]').should('have.attr', 'fill', '#8884d8');
        cy.get('path[name="Comentários"]').should('have.attr', 'fill', '#8884d8');
        cy.get('.ant-card-body p').should('contain.text', 'Suas contribuições no fórum (perguntas e comentários).');

        //Card de Tempo Total Gasto em Atividades
        cy.get('.ant-card-head-title').should('contain.text', 'Tempo Total Gasto em Atividades');
        cy.get('.ant-card-body h3')
            .should('have.text', '12h 0m')
            .should('have.css', 'color', 'rgb(130, 202, 157)')
            .should('have.css', 'font-size', '40px');

        //Card de Perguntas Recentes no Fórum
        cy.get('.ant-card-head-title').should('contain.text', 'Perguntas Recentes no Fórum');

        const questions = [
            { title: 'er', description: 'wr', date: 'Data de Criação: 23/11/2024' },
            { title: 'Oi', description: 'sdfd', date: 'Data de Criação: 23/11/2024' },
            { title: 'arduino falhando', description: 'sdfsdf', date: 'Data de Criação: 23/11/2024' },
        ];

        questions.forEach((question, index) => {
            cy.get(`.ant-col-24 > .ant-card > .ant-card-body > :nth-child(${index + 1})`).within(() => {
                cy.contains(question.title).should('exist');
                cy.contains(question.description).should('exist');
                cy.contains(question.date).should('exist');
            });
        });

    });
})