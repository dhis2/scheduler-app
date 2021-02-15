Feature: Users should be able to create jobs that take parameters

    Scenario Outline: User creates a <job-type> job
        Given the user navigated to the add job page
        And the user enters a job name
        And the user selects the <job-type> job type
        And the user enters a <schedule-type> schedule
        And the user enters the parameters for <job-type>
        When the user clicks the save button
        Then the <job-type> job data is sent to the backend

    Scenarios:
        |                   job-type | schedule-type |
        |            analytics table |          cron |
        | continuous analytics table |         delay |
        |       data synchronization |          cron |
        | tracker programs data sync |          cron |
        |   event programs data sync |          cron |
        |              metadata sync |          cron |
        |                 monitoring |          cron |
        |              push analysis |          cron |
        |                  predictor |          cron |
