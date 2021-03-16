Feature: Users should be able to create jobs without parameters

    Scenario Outline: User creates a <job-type> job
        Given the user navigated to the add job page
        And the user enters a job name
        And the user selects the <job-type> job type
        And the user enters a cron schedule
        Then the expected job is created when the user saves the <job-type> job
        And the job list is loaded

    Scenarios:
        |               job-type |
        |         data integrity |
        |         resource table |
        | send scheduled message |
        |  program notifications |
