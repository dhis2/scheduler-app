Feature: Queue actions

    Background:
        Given a single queue exists
        And the user navigated to the list route
        And the user clicks the actions button

    Scenario: User clicks the edit queue button on a queue
        When the user clicks the edit button
        Then the edit queue route will be loaded

    Scenario: User deletes a queue
        When the user clicks the delete button
        Then the queue will be deleted upon confirmation

    Scenario: User cancels a delete queue modal
        When the user clicks the delete button
        Then the queue will not be deleted upon cancelling
