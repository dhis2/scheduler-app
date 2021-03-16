import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('the user navigated to the add job page', () => {
    cy.visit('/#/add')
    cy.findByRole('heading', { name: 'New Job' }).should('exist')
})

Given('the user selects a cron scheduled job type', () => {
    /**
     * TODO: the selectors below aren't accessible selectors, should
     * be changed in ui.
     */

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
    /**
     * TODO: We have to scope the search for a cancel button here, as there are
     * two on this page. If our modal was accessible the scoping could be done
     * in a more accessible way.
     */

    cy.get('[data-test="dhis2-uicore-modal"]')
        .findByRole('button', { name: 'Cancel' })
        .click()
})

Then('the selected cron schedule will be inserted in the form', () => {
    /**
     * TODO: As this selector shows, the star that indicates that this input is required
     * is concatenated with the input name as there's no space between them in the
     * jsx. I think that we should probably look at an accessible way to indicate
     * that an input is required.
     */

    cy.findByLabelText('CRON Expression*')
        .should('exist')
        .and('have.value', '0 0 * ? * *')
})

Then('the selected cron schedule will not be inserted in the form', () => {
    /**
     * TODO: As this selector shows, the star that indicates that this input is required
     * is concatenated with the input name as there's no space between them in the
     * jsx. I think that we should probably look at an accessible way to indicate
     * that an input is required.
     */

    cy.findByLabelText('CRON Expression*')
        .should('exist')
        .and('have.value', '')
})
