Feature: Users should be able to view system jobs

    Scenario: User views a system job
        Given a single system job exists
        And the user navigated to the view job page
        Then the system job data should be displayed in the form
        And the system job details should be visible
