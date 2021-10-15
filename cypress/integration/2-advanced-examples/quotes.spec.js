describe('Quotes App', () =>{
    beforeEach(() =>{
        cy.visit('http://localhost:3000/pizza');
    })

    const nameIn = () => cy.get('input[name=name]');
    const specIn = () => cy.get('textarea[name=special]');
    const topIn = () => cy.get('input[name=bacon]');
    const topIn2 = () => cy.get('input[name=greenPepper]');
    const submitIn = () => cy.get('input[name=sub]');
    const dropdown = () => cy.get('select[name=size]')


    describe('Filling out the input', () => {
        it('can navigate to the url', () => {
            cy.url().should('include', 'localhost');
        })

        it('can type in the inputs, select multiple toppings, select size, and submit', () =>{
            nameIn()
            .should('have.value', '')
            .type('test1223')
            .should('have.value', 'test1223');
            specIn()
            .should('have.value', '')
            .type('test1223')
            .should('have.value', 'test1223');
            topIn()
            .click()
            .should('have.value', 'on'),
            topIn2()
            .click()
            .should('have.value', 'on'),
            dropdown()
            .select('10inch')
            .should('have.value', '10inch')
            submitIn()
            .click()
            .should('have.value', 'submit')
        })
    })
})