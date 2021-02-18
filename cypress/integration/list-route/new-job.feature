Feature: Users should be able to navigate to the new job route

    Scenario: User clicks the new job button
        Given the user navigated to the job list page
        When the user clicks the new job button
        Then the new job route will be loaded
