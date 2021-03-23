Feature: Jobs can be filtered

    Scenario: User filters user jobs by name
        Given some user jobs exist
        And the user navigated to the job list page
        When the user enters a filter string
        Then only user jobs that match the filter will be shown

    Scenario: User filters all jobs by name
        Given some user and system jobs exist
        And the user navigated to the job list page
        And the user enables the include-system-jobs-in-list toggle
        When the user enters a filter string
        Then only jobs that match the filter will be shown
