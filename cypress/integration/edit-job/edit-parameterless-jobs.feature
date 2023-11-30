Feature: Users should be able to edit jobs without parameters

    Scenario Outline: User edits a <job-type> job
        Given a single user job with parameters exists
        And the user navigated to the edit job page
        And the user enters a job name
        And the user selects the <job-type> job type
        And the user enters a cron schedule
        Then the job is updated when the user saves the <job-type> job
        And the list route is loaded

    Scenarios:
        |               job-type |
        |         data integrity |
        |         resource table |
        | send scheduled message |
        |  program notifications |
