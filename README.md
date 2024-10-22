![React 18](https://img.shields.io/badge/react-18-blue)

# Scheduler

## Cypress env settings

Cypress needs a couple of environment variables to function correctly for local testing. They can be defined in a `cypress.env.json` at the root of the project. You can use `cypress.env.json.example` as a template by copying it, removing the `.example` suffix and replacing the username and password.

## Concepts

These concepts are used throughout the app:

-   A `job` is a single task that can be planned with a cron expression, or to run with a certain interval between executions (delay).
-   A `queue` or `job queue` is a collection of jobs that will be executed in sequence.
-   A `queueable` is a job that is not part of a queue (this concept is not used in the ui)
-   We retrieve items from the `/scheduler` endpoint to simplify rendering the root list view. These can be either jobs or queues. Instead of calling these `schedules`, after the endpoint, we're calling these `jobsAndQueues`. This is to prevent confusion with the `schedule` property of jobs and queues.

In the ui we're using the concepts `job queue` and `job` (so the user is only aware of those terms). We also use the heading `Scheduled jobs` in the list view, since the queues and jobs essentially are all scheduled jobs.
