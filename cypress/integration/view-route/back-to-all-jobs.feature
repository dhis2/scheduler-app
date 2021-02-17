Feature: Users should be able to navigate back to the job list

    Background:
        Given the user navigated to the view job page

    Scenario: User clicks the top back to all jobs link
        When the user clicks the top back to all jobs link
        Then the job list route will be loaded

    Scenario: User clicks the bottom back to all jobs link
        When the user clicks the bottom back to all jobs link
        Then the job list route will be loaded
