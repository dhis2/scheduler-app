Feature: Users should be able to view jobs

    Scenario Outline: User views a <job-type> job
        Given the user navigated to the edit job page for a <job-type> job
        Then the <job-type> data should be displayed in the form
        And the <job-type> job details should be visible

    Scenarios:
        |                   job-type |
        |            analytics table |
        | continuous analytics table |
        |       data synchronization |
        | tracker programs data sync |
        |   event programs data sync |
        |              metadata sync |
        |                 monitoring |
        |              push analysis |
        |                  predictor |
        |             data integrity |
        |             resource table |
        |     send scheduled message |
        |      program notifications |
