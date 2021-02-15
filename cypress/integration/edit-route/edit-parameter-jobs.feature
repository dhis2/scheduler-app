Feature: Users should be able to edit jobs that take parameters

    Scenario Outline: User edits a <job-type> job
        Given the user navigated to the edit job page for a <job-type> job
        And the user enters a new job name
        And the user enters a new <schedule-type> schedule
        And the user enters new parameters for <job-type>
        When the user clicks the save button
        Then the new <job-type> job data is sent to the backend

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
