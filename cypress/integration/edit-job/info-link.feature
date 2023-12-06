Feature: Users should be able to navigate to the documentation

    Scenario: User clicks the info link
        Given a single user job exists
        And the user navigated to the edit job route
        Then there is a link to the documentation
