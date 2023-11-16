Feature: Queues should be listed

    Scenario: View a queue
        Given a queue exists
        And the user navigated to the list page
        Then the queue is rendered as tabular data
        And the user clicks the expand button
        Then the queued jobs are shown
