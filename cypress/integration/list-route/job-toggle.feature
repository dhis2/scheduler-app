Feature: User jobs can be enabled and disabled

    Scenario Outline: The user <action> a <owner> job
        Given the user navigated to the job list page
        And a <initial> <owner> job exists
        And the on/off switch is <before>
        When the user clicks the on/off switch
        Then the on/off switch is <after>

    Scenarios:
        | owner |   action |  initial | before | after |
        |  user | disables |  enabled |     on |   off |
        |  user |  enables | disabled |    off |    on |
