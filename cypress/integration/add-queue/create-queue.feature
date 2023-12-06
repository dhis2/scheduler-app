Feature: Users should be able to create a queue

    Scenario: User creates a queue
        Given two unqueued jobs exist
        And the user navigated to the add queue route
        And the user enters a queue name
        And the user enters a cron schedule
        And the user adds jobs to the queue
        Then the expected queue is created when the user saves the queue
        And the list route is loaded
