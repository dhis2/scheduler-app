Feature: On the overview page the user can see delay between delay jobs

    Scenario: At least one delay job already exists
        Given the overview of jobs is visible
        And a delay job exists
        Then the delay between executions is displayed in seconds
