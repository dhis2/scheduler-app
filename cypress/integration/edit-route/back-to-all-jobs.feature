Feature: Users should be able to navigate back to the job list

    Background:
        Given the user navigated to an edit job page

    Scenario: User clicks the back to all jobs link
        When the user clicks the back to all jobs link
        Then the job list route will be loaded

    Scenario: User clicks the back to all jobs link after editing the form
        Given the user has edited the form
        When the user clicks the back to all jobs link
        Then the user will be asked if they want to discard the form

    Scenario: User clicks the cancel button
        When the user clicks the cancel button
        Then the job list route will be loaded

    Scenario: User clicks the cancel button after editing the form
        Given the user has edited the form
        When the user clicks the cancel button
        Then the user will be asked if they want to discard the form
