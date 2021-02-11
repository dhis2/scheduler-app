Feature: All user defined jobs should be listed

    Background:
        Given the user navigated to the job list page

    Scenario: No user jobs exist
        Given there are no user jobs
        Then the user should be notified that there are no jobs

    Scenario: Some user jobs exist
        Given some user jobs exist
        Then the user jobs are rendered as tabular data
        And each row displays the job details
