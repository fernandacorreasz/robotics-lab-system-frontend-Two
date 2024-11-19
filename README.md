
# Robotics Lab System

Este é um sistema de controle desenvolvido de forma didática, com foco no gerenciamento de um laboratório de robótica. Ele visa simplificar o controle de equipamentos, atividades e fluxos administrativos, sendo também uma entrega de portfólio acadêmico para a formação em Engenharia de Software.


https://github.com/user-attachments/assets/9fea6bcc-2783-4c7b-9e71-77122846638d


## Repositórios

- **Frontend:** [robotics-lab-system-frontend-Two](https://github.com/fernandacorreasz/robotics-lab-system-frontend-Two)
- **Backend:** [robotics-lab-system-backend](https://github.com/fernandacorreasz/robotics-lab-system-backend)

## Acesso à aplicação

- **Frontend em execução:** [http://4.196.97.77:5173/](http://4.196.97.77:5173/)
- **Documentação da API:** [http://4.196.97.77:9002/swagger-ui/index.html#/](http://4.196.97.77:9002/swagger-ui/index.html#/)

---

## Tecnologias Utilizadas

### Backend
- **Linguagem:** Java
- **Framework:** Spring Boot
- **Autenticação:** Spring Security com JWT
- **Gerenciamento de Banco de Dados:** Flyway e PostgreSQL
- **Containerização:** Docker e Docker Compose
- **Documentação:** Swagger
- **Testes:** JUnit e Mockito

### Frontend
- **Linguagem:** TypeScript
- **Framework:** React
- **Gerenciamento de Pacotes:** npm
- **Ambiente de Desenvolvimento:** Node.js
- **Estado atual:** Sem testes implementados

---

## Módulos da Aplicação

A aplicação está dividida em três módulos principais, cada um com suas próprias funcionalidades.

### **1. Módulo Administrador**
O módulo do administrador permite a gestão completa do sistema. As principais funcionalidades incluem:
- **Dashboard:** Visão geral do sistema.
- **Gerenciar Usuários:** Cadastro, edição e remoção de usuários.
- **Certificados:** Emissão de certificados para estudantes.
- **Relatórios de Desempenho:** Análise das atividades e progresso dos estudantes.
- **Fórum-SAC:** Espaço para tirar dúvidas e fornecer suporte.
- **Configurações de Perfil:** Ajuste de informações pessoais e de sistema.

### **2. Módulo Laboratorista**
O módulo do laboratorista é focado no gerenciamento prático do laboratório:
- **Dashboard:** Visão geral de equipamentos, atividades e demandas.
- **Gerenciar Atividades:** Controle das atividades realizadas no laboratório.
- **Gerenciar Estoque:** Cadastro e controle de componentes e equipamentos.
- **Gerenciar Empréstimos:** Controle de empréstimos de equipamentos.
- **Fórum:** Comunicação com estudantes e administradores.
- **Gerenciar Usuários:** Gestão de usuários vinculados ao laboratório.
- **Notificações de Alunos:** Visualização de notificações e demandas enviadas pelos estudantes.

### **3. Módulo Estudante**
O módulo do estudante fornece acesso às ferramentas necessárias para seus projetos e aprendizado:
- **Dashboard:** Visão geral de notificações, atividades e progresso.
- **Atividades:** Consulta e gerenciamento das atividades atribuídas.
- **Biblioteca de Componentes:** Visualização dos componentes disponíveis no laboratório.
- **Notificações:** Acompanhamento de mensagens enviadas pelo laboratorista ou administrador.
- **Fórum:** Comunicação com laboratoristas e outros estudantes.
- **Solicitar Certificado:** Envio de pedidos de certificados ao administrador.

---
## Diagrama de Casos de Uso

Abaixo está um diagrama básico representando os principais casos de uso do sistema. Ele destaca as interações dos três perfis de usuários: Administrador, Laboratorista e Estudante.


---

## Documentação

A documentação detalhada da aplicação pode ser acessada pelos seguintes meios

---

## Vídeo Explicativo

Um vídeo demonstrativo está sendo preparado para explicar as funcionalidades da aplicação. Assim que finalizado, será disponibilizado neste repositório.




