Feature: Users should be able to create a sequence

    Scenario: User creates a sequence
        Given two unqueued jobs exist
        And the user navigated to the add sequence page
        And the user enters a sequence name
        And the user enters a cron schedule
        And the user adds jobs to the queue
        Then the expected sequence is created when the user saves the sequence
        And the job list is loaded
