Feature: User jobs can be enabled and disabled

    Scenario: The user enables a user job
        Given a disabled user job exists
        And the user navigated to the job list page
        And the job toggle switch is off
        When the user clicks the job toggle switch
        Then the job toggle switch is on

    Scenario: The user disables a user job
        Given an enabled user job exists
        And the user navigated to the job list page
        And the job toggle switch is on
        When the user clicks the job toggle switch
        Then the job toggle switch is off
