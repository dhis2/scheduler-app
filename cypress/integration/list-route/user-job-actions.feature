Feature: User job actions

    Background:
        Given some user jobs exist
        And the user navigated to the job list page
        And the user clicks the actions button

    Scenario: User clicks the edit job button on a user job
        When the user clicks the edit button
        Then the edit job route will be loaded

    Scenario: User manually runs a user job
        When the user clicks the run manually button
        And the user confirms the run manually modal
        Then the job will be executed

    Scenario: User cancels a manual user job run modal
        When the user clicks the run manually button
        And the user cancels the run manually modal
        Then the job will not be executed

    Scenario: User deletes a user job
        When the user clicks the delete button
        And the user confirms the delete modal
        Then the job will be deleted

    Scenario: User cancels a delete user job modal
        When the user clicks the delete button
        And the user cancels the delete modal
        Then the job will not be deleted
