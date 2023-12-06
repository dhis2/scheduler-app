Feature: Users should be able to navigate back to the list route

    Background:
        Given a sequence exists
        And the user navigates to the edit sequence route

    Scenario: User clicks the cancel button
        When the user clicks the cancel button
        Then the list route will be loaded

    Scenario: User clicks the cancel button after editing the form
        Given the user has edited the form
        When the user clicks the cancel button
        Then the user will be asked if they want to discard the form
