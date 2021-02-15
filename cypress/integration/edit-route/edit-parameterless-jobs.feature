Feature: Users should be able to edit jobs without parameters

    Scenario Outline: User edits a <job-type> job
        Given the user navigated to the edit job page for a <job-type> job
        And the user enters a new job name
        And the user enters a new cron schedule
        When the user clicks the save button
        Then the new <job-type> job data is sent to the backend

    Scenarios:
        |               job-type |
        |         data integrity |
        |         resource table |
        | send scheduled message |
        |  program notifications |
