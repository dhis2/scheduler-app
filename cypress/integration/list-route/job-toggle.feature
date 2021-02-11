Feature: Jobs can be enabled and disabled

    Background:
        Given the user navigated to the job list page

    Scenario Outline: The user <action> a <owner> job
        Given a <initial> <owner> job exists
        And the on/off switch is <before>
        When the user clicks the on/off switch
        Then the on/off switch is <after>

    Scenarios:
        | owner |   action |  initial | before | after |
        |  user | disables |  enabled |     on |   off |
        |  user |  enables | disabled |    off |    on |

    Background:
        Given the user navigated to the job list page
        And system jobs are visible

    Scenario Outline: The user <action> a <owner> job
        Given a <initial> <owner> job exists
        And the on/off switch is <before>
        When the user clicks the on/off switch
        Then the on/off switch is <after>

    Scenarios:
        |   owner |   action |  initial | before | after |
        |  system | disables |  enabled |     on |   off |
        |  system |  enables | disabled |    off |    on |
