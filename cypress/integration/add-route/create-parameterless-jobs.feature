Feature: Users should be able to create jobs without parameters

    Scenario Outline: User creates a <job-type> job
        Given the user navigated to the add job page
        And the user enters a job name
        And the user selects the <job-type> job type
        And the user enters a cron schedule
        When the user clicks the save button
        Then the <job-type> job data is sent to the backend

    Scenarios:
        |               job-type |
        |         data integrity |
        |         resource table |
        | send scheduled message |
        |  program notifications |
