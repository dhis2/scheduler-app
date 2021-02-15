Feature: Users should be able to delete a job

    Background:
        Given the user navigated to an edit job page
        And the user clicks the delete job button

    Scenario: User deletes a job
        When the user clicks delete in the delete confirmation modal
        Then the job will be deleted

    Scenario: User cancels inserting a cron preset
        When the user clicks cancel in the delete confirmation modal
        Then the job will not be deleted
