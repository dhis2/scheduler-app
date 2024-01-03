Feature: Users should be able to delete a job

    Background:
        Given a single user job exists
        And the user navigated to the edit job route
        And the user clicks the delete job button

    Scenario: User deletes a job
        Then the job will be deleted upon confirmation

    Scenario: User cancels deleting a job
        Then the job will not be deleted upon cancelling
