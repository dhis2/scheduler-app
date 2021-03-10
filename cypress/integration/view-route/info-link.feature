Feature: Users should be able to navigate to the documentation

    Scenario: User clicks the info link
        Given a single system job exists
        And the user navigated to the view job page
        Then there is a link to the documentation
