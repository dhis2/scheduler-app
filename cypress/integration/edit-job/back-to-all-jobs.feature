Feature: Users should be able to navigate back to the job list

    Background:
        Given a single user job exists
        And the user navigated to the edit job page

    Scenario: User clicks the cancel button
        When the user clicks the cancel button
        Then the job list route will be loaded

    Scenario: User clicks the cancel button after editing the form
        Given the user has edited the form
        When the user clicks the cancel button
        Then the user will be asked if they want to discard the form
