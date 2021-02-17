Feature: System job actions

    Background:
        Given some system jobs exist
        And the user navigated to the job list page
        And system jobs are visible
        And the user clicks the actions button

    Scenario: User clicks the view job button on a system job
        When the user clicks the view button
        Then the view job route will be loaded
