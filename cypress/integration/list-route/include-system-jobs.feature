Feature: System job visibility can be toggled

    Scenario: System jobs are not shown by default
        Given some user and system jobs exist
        And the user navigated to the job list page
        Then the include-system-jobs-in-list checkbox is unchecked
        And system jobs are not shown

    Scenario: User toggles system job visibility
        Given some user and system jobs exist
        And the user navigated to the job list page
        And the include-system-jobs-in-list checkbox is unchecked
        When the user checks the include-system-jobs-in-list checkbox
        Then system jobs are shown
        And user jobs are shown
