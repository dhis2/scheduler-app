Feature: Users should be able to view jobs

    Scenario: User views a user job
        Given a single user job exists
        And the user navigated to the edit job page
        Then the user job data should be displayed in the form
        And the user job details should be visible
