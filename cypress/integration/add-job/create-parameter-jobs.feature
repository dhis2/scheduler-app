Feature: Users should be able to create jobs that take parameters

    Scenario Outline: User creates a <job-type> job
        Given the user navigated to the add job route
        And the user enters a job name
        And the user selects the <job-type> job type
        And the user enters a <schedule-type> schedule
        And the user enters the parameters for <job-type>
        Then the expected job is created when the user saves the <job-type> job
        And the list route is loaded

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
