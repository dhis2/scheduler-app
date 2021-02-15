Feature: Users should be able to insert cron presets

    Background:
        Given the user navigated to an edit job page for a cron scheduled job

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
