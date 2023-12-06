Feature: Users should be able to insert cron presets

    Scenario: User inserts a cron preset
        Given the user navigated to the add job route
        And the job types have loaded
        And the user selects a cron scheduled job type
        When the user clicks the choose from preset times button
        And selects a cron preset from the modal
        And clicks the insert preset button
        Then the selected cron schedule will be inserted in the form

    Scenario: User cancels inserting a cron preset
        Given the user navigated to the add job route
        And the job types have loaded
        And the user selects a cron scheduled job type
        When the user clicks the choose from preset times button
        And selects a cron preset from the modal
        And clicks cancel in the preset cron modal
        Then the selected cron schedule will not be inserted in the form
