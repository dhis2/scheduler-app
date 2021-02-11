Feature: System job visibility can be toggled

    Background:
        Given some system jobs exist
        And the user navigated to the job list page

    Scenario: System jobs are not shown by default
        Then the include-system-jobs checkbox is unchecked
        And system jobs are not visible

    Scenario: User toggles system job visibility
        Given some user jobs exist
        And the include system jobs checkbox is unchecked
        When the user checks the include system jobs checkbox
        Then the include system jobs checkbox is checked
        And system jobs are visible
        And user jobs are visible
