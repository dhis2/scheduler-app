Feature: All user defined jobs should be listed

    Scenario: No user jobs exist
        Given there are no user jobs
        And the user navigated to the list route
        Then the table should contain a cell that states that there are no jobs

    Scenario: Some user jobs exist
        Given some user jobs exist
        And the user navigated to the list route
        Then the user jobs are rendered as tabular data
