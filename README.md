# Testes para SuperFrete

## Descrição
Este projeto contém os testes automatizados para a aplicação web de cálculo de frete, utilizando o Cypress.

## Pré-requisitos
Node.js e npm (ou yarn): Instale as últimas versões do Node.js e npm (ou yarn) em seu sistema.
Cypress: Instale o Cypress globalmente ou localmente para este projeto.

## Instalação
Clone o repositório:

git clone https://seu-repositorio.git

## Instale as dependências:

cd cypress_superFrete

npm install

## Executando os Testes
Abra o Cypress:

npx cypress open

Isso abrirá a interface gráfica do Cypress, onde você poderá selecionar o navegador e os testes que deseja executar.
## Execute um teste específico:

npx cypress run --spec cypress/e2e/calcular_frete.cy.js

Este comando executará apenas o teste calcular_frete.cy.js no modo headless.

# Estrutura do Projeto
    cypress_supreFrete/
    ├── cypress/
    │   ├── e2e/
    │   │   └── calcular_frete.cy.js
    │   └── support/
    │       └── commands.js
    |       |__ e2e.js    
    └── package.json

cypress/e2e: Contém os arquivos de teste.

cypress/support: Contém arquivos de suporte com comandos personalizados.

package.json: Lista as dependências do projeto.
