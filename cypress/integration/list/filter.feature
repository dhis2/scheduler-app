Feature: Jobs can be filtered

    Scenario: User filters user jobs and queues by name
        Given some user jobs and queues exist
        And the user navigated to the list route
        When the user enters a filter string
        Then only user jobs and queues that match the filter will be shown

    Scenario: User filters all jobs by name
        Given some user and system jobs exist
        And the user navigated to the list route
        And the user enables the include-system-jobs-in-list toggle
        When the user enters a filter string
        Then only jobs that match the filter will be shown
