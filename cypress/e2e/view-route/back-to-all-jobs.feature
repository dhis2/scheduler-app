Feature: Users should be able to navigate back to the job list

    Scenario: There are two links to the job list
        Given a single system job exists
        And the user navigated to the view job page
        Then there are two links to the job list page
