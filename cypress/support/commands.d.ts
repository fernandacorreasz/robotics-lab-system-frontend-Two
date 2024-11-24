/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject = any> {
      /**
       * Realiza o login diretamente via API e armazena o token no local.
       * @param email
       * @param password
       */
      loginEstudante(email?: string, password?: string): Chainable<void>;
      loginLaboratorista(email?: string, password?: string): Chainable<void>;
      loginAdmin(email?: string, password?: string): Chainable<void>;
    }
  }
  