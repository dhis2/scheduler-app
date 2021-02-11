Feature: System job actions

    Background:
        Given some system jobs exist
        And the user navigated to the job list page
        And system jobs are visible
        And the user clicks the actions button

    Scenario: User manually runs a system job
        When the user clicks the run manually button
        And the user confirms the run manually modal
        Then the job will be executed

    Scenario: User cancels a manual system job run modal
        When the user clicks the run manually button
        And the user cancels the run manually modal
        Then the job will not be executed

    Scenario: User deletes a system job
        When the user clicks the delete button
        And the user confirms the delete modal
        Then the job will be deleted

    Scenario: User cancels a delete system job modal
        When the user clicks the delete button
        And the user cancels the delete modal
        Then the job will not be deleted
