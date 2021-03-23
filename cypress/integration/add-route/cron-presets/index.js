import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('the user navigated to the add job page', () => {
    cy.visit('/#/add')
    cy.findByRole('heading', { name: 'New Job' }).should('exist')
})

Given('the user selects a cron scheduled job type', () => {
    cy.get('[data-test="dhis2-uicore-select-input"]').click()
    cy.findByText('Data integrity').click()
})

When('the user clicks the choose from preset times button', () => {
    cy.findByRole('button', { name: 'Choose from preset times' }).click()
})

When('selects a cron preset from the modal', () => {
    cy.findByLabelText('Every hour').click()
})

When('clicks the insert preset button', () => {
    cy.findByRole('button', { name: 'Insert preset' }).click()
})

When('clicks cancel in the preset cron modal', () => {
    cy.get('[data-test="dhis2-uicore-modal"]')
        .findByRole('button', { name: 'Cancel' })
        .click()
})

Then('the selected cron schedule will be inserted in the form', () => {
    cy.findByLabelText('CRON Expression*')
        .should('exist')
        .and('have.value', '0 0 * ? * *')
})

Then('the selected cron schedule will not be inserted in the form', () => {
    cy.findByLabelText('CRON Expression*').should('exist').and('have.value', '')
})
