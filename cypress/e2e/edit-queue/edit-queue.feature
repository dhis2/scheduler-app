Feature: Users should be able to edit a queue

    Scenario: User edits a queue
        Given a queue with two unqueued jobs exists
        And the user navigates to the edit queue route
        And the user changes the queue name
        And the user changes the cron schedule
        And the user adds jobs to the queue
        Then the queue is updated when the user saves the queue
        And the list route is loaded
