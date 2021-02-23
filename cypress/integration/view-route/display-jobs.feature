Feature: Users should be able to view system jobs

    Scenario Outline: User views a system job
        Given the user navigated to the view job page for a system job
        Then the system job data should be displayed in the form
        And the system job details should be visible
