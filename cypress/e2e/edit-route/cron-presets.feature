Feature: Users should be able to insert cron presets

    Background:
        Given a single cron scheduled user job exists
        And the user navigated to the edit job page

    Scenario: User inserts a cron preset
        When the user clicks the choose from preset times button
        And selects a cron preset from the modal
        And clicks the insert preset button
        Then the selected cron schedule will be inserted in the form

    Scenario: User cancels inserting a cron preset
        When the user clicks the choose from preset times button
        And selects a cron preset from the modal
        And clicks cancel in the preset cron modal
        Then the selected cron schedule will not be inserted in the form
