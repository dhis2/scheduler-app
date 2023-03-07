Feature: Users that are not authorized should be denied access

    Scenario: An unauthorized user attempts to log in
        Given an unauthorized user navigates to the app
        Then the user will be shown an error message
