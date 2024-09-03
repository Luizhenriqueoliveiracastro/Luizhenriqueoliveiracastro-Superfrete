describe('Suite de Calculo de frete - teste positivo', () => {
    beforeEach(() => {
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
        cy.visit('/');
        cy.wait(12000);
    });

    const ceps = {
        origem: '08090-284',
        destino: '05407-002',
    };
    const dimensoes = {
        altura: 2,
        largura: 11,
        comprimento: 17,
    };
    const enderecos = {
        origem: 'Rua 03 de Outubro',
        destino: 'Rua Cardeal Arcoverde',
    };

    const valorApp = {
        pac: 'R$ 10,39',
        sedex: 'R$ 3,07',
        mini_envios: 'R$ 5,15',
    };

    it.only('CT01 - Calcular frete com valores validos', () => {
        cy.log('Inicio do caso de teste 1');

        // preencher cep origem
        cy.get('#originPostcode').type(ceps.origem);
        // escolher peso
        cy.get('#weight').click();
        cy.get('[data-value="0.3"]').click();
        // preencher altura
        cy.get('#packageHeight').type(dimensoes.altura);
        // preencher largura
        cy.get('#packageWidth').type(dimensoes.largura);
        // preencher comprimento
        cy.get('#packageDepth').type(dimensoes.comprimento);
        // preencher cep destino
        cy.get('#destinationPostcode').type(ceps.destino);
        // solicitar calculo
        cy.get('[data-cy="calculator-submit"]').click();

        // validar o valor do sedex
        cy.get('#calculator-SEDEX-amount-text > strong').should(
            'have.text',
            valorApp.sedex
        );
        //verificar endereco origem
        cy.contains(
            ':nth-child(1) > .MuiStepContent-root > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiTypography-root',
            enderecos.origem
        );
        //verificar endereco destino
        cy.contains(
            ':nth-child(3) > .MuiStepContent-root > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiTypography-root',
            enderecos.destino
        );
    });
});

describe('Suite de Calculo de frete - testes negativos', () => {
    beforeEach(() => {
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
        cy.visit('https://web.superfrete.com');
        cy.wait(14000);
    });

    const ceps = {
        origem: '08090-284',
        destino: '05407-002',
    };
    const dimensoes = {
        altura: 3,
        largura: 11,
        comprimento: 16,
    };
    const enderecos = {
        origem: 'Rua 03 de Outubro',
        destino: 'Rua Cardeal Arcoverde',
    };

    const valorApp = {
        pac: 'R$ 10,39',
        sedex: 'R$ 3,07',
        mini_envios: 'R$ 5,15',
    };

    it('CT02 - Solicitar calculo de frete com dimensoes minimas invalidas', () => {
        dimensoes.altura = 0.3;
        dimensoes.largura = 7;
        dimensoes.comprimento = 12;

        // preencher cep origem
        cy.get('#originPostcode').type(ceps.origem);
        // escolher peso
        cy.get('#weight').click();
        cy.get('[data-value="0.3"]').click();
        // preencher altura
        cy.get('#packageHeight').type(dimensoes.altura);
        // preencher largura
        cy.get('#packageWidth').type(dimensoes.largura);
        // preencher comprimento
        cy.get('#packageDepth').type(dimensoes.comprimento);
        // preencher cep destino
        cy.get('#destinationPostcode').type(ceps.destino);
        // solicitar calculo
        cy.get('[data-cy="calculator-submit"]').click();

        // validar restricao de altura
        cy.get('#packageHeight-helper-text').should(
            'have.text',
            'Altura mínima 0.4 cm.'
        );
        // validar restricao de largura
        cy.get('#packageWidth-helper-text').should(
            'have.text',
            'Largura mínima 8 cm.'
        );
        // validar restricao de comprimento
        cy.get('#packageDepth-helper-text').should(
            'have.text',
            'Comprimento mínimo 13 cm.'
        );
    });
    it.only('CT03 - Solicitar calculo de frete com dimensoes maximas invalidas', () => {
        dimensoes.altura = 151;
        dimensoes.largura = 150.1;
        dimensoes.comprimento = 152;

        // preencher cep origem
        cy.get('#originPostcode').type(ceps.origem);
        // escolher peso
        cy.get('#weight').click();
        cy.get('[data-value="0.3"]').click();
        // preencher altura
        cy.get('#packageHeight').type(dimensoes.altura);
        // preencher largura
        cy.get('#packageWidth').type(dimensoes.largura);
        // preencher comprimento
        cy.get('#packageDepth').type(dimensoes.comprimento);
        // preencher cep destino
        cy.get('#destinationPostcode').type(ceps.destino);
        // solicitar calculo
        cy.get('[data-cy="calculator-submit"]').click();

        // validar restricao de altura
        cy.get('#packageHeight-helper-text').should(
            'have.text',
            'Altura máxima 150 cm.'
        );
        // validar restricao de largura
        cy.get('#packageWidth-helper-text').should(
            'have.text',
            'Largura máxima 150 cm.'
        );
        // validar restricao de comprimento
        cy.get('#packageDepth-helper-text').should(
            'have.text',
            'Comprimento máximo 150 cm.'
        );
    });
    it('CT04 - Solicitar calculo de frete com soma das dimensoes invalidas', () => {
        dimensoes.altura = 90;
        dimensoes.largura = 140;
        dimensoes.comprimento = 101;

        // preencher cep origem
        cy.get('#originPostcode').type(ceps.origem);
        // escolher peso
        cy.get('#weight').click();
        cy.get('[data-value="0.3"]').click();
        // preencher altura
        cy.get('#packageHeight').type(dimensoes.altura);
        // preencher largura
        cy.get('#packageWidth').type(dimensoes.largura);
        // preencher comprimento
        cy.get('#packageDepth').type(dimensoes.comprimento);
        // preencher cep destino
        cy.get('#destinationPostcode').type(ceps.destino);
        // solicitar calculo
        cy.get('[data-cy="calculator-submit"]').click();

        // validar soma das dimensoes
        cy.get(':nth-child(9) > .MuiTypography-root').should(
            'have.text',
            'a soma resultante da altura + largura + comprimento não deve superar 300 cm.'
        );
    });
});
