Feature: System job actions

    Scenario: User clicks the view job button on a system job
        Given a single system job exists
        And the user navigated to the job list page
        And the user checks the include-system-jobs-in-list checkbox
        And the user clicks the actions button
        When the user clicks the view button
        Then the view job route will be loaded
