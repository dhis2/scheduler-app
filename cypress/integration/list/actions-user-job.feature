Feature: User job actions

    Background:
        Given a single user job exists
        And the user navigated to the list route
        And the user clicks the actions button

    Scenario: User clicks the edit job button on a user job
        When the user clicks the edit button
        Then the edit job route will be loaded

    Scenario: User manually runs a user job
        When the user clicks the run manually button
        Then the job will be executed upon confirmation

    Scenario: User cancels a manual user job run modal
        When the user clicks the run manually button
        Then the job will not be executed upon cancelling

    Scenario: User deletes a user job
        When the user clicks the delete button
        Then the job will be deleted upon confirmation

    Scenario: User cancels a delete user job modal
        When the user clicks the delete button
        Then the job will not be deleted upon cancelling
