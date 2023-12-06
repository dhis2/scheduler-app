Feature: Users should be able to edit a sequence

    Scenario: User edits a sequence
        Given a sequence with two unqueued jobs exists
        And the user navigates to the edit sequence route
        And the user changes the sequence name
        And the user changes the cron schedule
        And the user adds jobs to the queue
        Then the sequence is updated when the user saves the sequence
        And the list route is loaded
