Feature: The user can choose between cron and delay scheduling type

    Scenario: The user didn't choose a scheduling type yet
        Given the add-job form is visible
        And no scheduling type has been selected
        Then no input fields for either cron or delay are visible

    Scenario: The user adds a new job of scheduling type cron
        Given the add-job form is visible
        When a job type without "CONTINUOUS" in its name is selected
        Then a cron-job pattern can be entered

    Scenario: The user adds a new job of scheduling type delay
        Given the add-job form is visible
        When a job type with "CONTINUOUS" in its name is selected
        Then a delay in seconds can be entered

    Scenario: The user changes an existing cron job to a delay job
        Given the user opened the edit job form of a cron job
        When a job type with "CONTINUOUS" in its name is selected
        Then a delay in seconds can be entered

    Scenario: The user changes an existing delay job to a cron job
        Given the user opened the edit job form of a delay job
        When a job type without "CONTINUOUS" in its name is selected
        Then a cron-job pattern can be entered
