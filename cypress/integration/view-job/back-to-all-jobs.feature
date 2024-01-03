Feature: Users should be able to navigate back to the list route

    Scenario: There is a link to the list route
        Given a single system job exists
        And the user navigated to the view job route
        Then there is a link to the list route
