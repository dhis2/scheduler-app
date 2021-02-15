Feature: Users should be able to navigate to the documentation

    Scenario: User clicks the info link
        Given the user navigated to the add job page
        When the user clicks the info link
        Then the documentation will be loaded in a new tab
