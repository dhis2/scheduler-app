Feature: Jobs can be filtered

    Background:
        Given some user jobs exist
        And the user navigated to the job list page

    Scenario: User filters user jobs by name
        When the user enters a filter string
        Then only user jobs that match the filter will be shown

    Scenario: User filters all jobs by name
        Given some system jobs exist
        And system jobs are visible
        When the user enters a filter string
        Then only jobs that match the filter will be shown
