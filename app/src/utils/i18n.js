import i18next from 'i18next';

const initializeI18n = d2 => {
    i18next.init(
        {
            lng: 'en',
            returnEmptyString: false,
            fallbackLng: false,
            keySeparator: '|',
            resources: {
                en: {
                    translation: {
                        add_new_job: 'Add new job',
                        are_you_sure_you_want_to_delete: 'Are you sure you want to delete',
                        are_you_sure_you_want_to_discard_your_changes:
                            'Are you sure you want to discard your changes?',
                        attributes: 'Attributes',
                        cancel: 'Cancel',
                        details: 'Details',
                        click_to_select: 'Click to select',
                        confirm: 'Confirm',
                        continuous_execution: 'Continuous execution',
                        could_not_create_job: 'Could not create job',
                        could_not_update_job: 'Could not update job',
                        could_not_find_job: 'Could not find job',
                        cron_expression: 'Cron expression',
                        invalid_cron_expression: 'Invalid cron expression',
                        delete_job: 'Delete job',
                        enabled: 'Enabled',
                        end_time: 'End time',
                        job_type: 'Job type',
                        name: 'Name',
                        next_execution: 'Next execution',
                        required: 'Required',
                        save_changes: 'Save changes',
                        scheduled_jobs: 'Scheduled jobs',
                        select_frequency: 'Select frequency',
                        start_time: 'Start time',
                        status: 'Status',
                        submit: 'Submit',
                        successfully_created_job: 'Successfully created job',
                        successfully_deleted_job: 'Successfully deleted job',
                        successfully_updated_job: 'Successfully updated job',
                        type: 'Type',
                        not_authorized_message: 'You are not authorized to use this app',
                        must_be_of_two_or_more_characters: 'Must be of two or more characters',

                        created: 'Created',
                        last_executed: 'Last executed',
                        last_execution_status: 'Last execution status',

                        // Job statuses
                        DISABLED: 'Disabled',
                        SCHEDULED: 'Scheduled',
                        RUNNING: 'Running',
                        COMPLETED: 'Completed',
                        FAILED: 'Failed',

                        // Cron expressions
                        CUSTOM: 'Custom',
                        EVERY_HOUR: 'Every hour',
                        EVERY_DAY_MIDNIGHT: 'Every day at midnight',
                        EVERY_DAY_THREE_AM: 'Every day at 3 AM',
                        EVERY_WEEKDAY_NOON: 'Every day at noon',
                        EVERY_WEEK: 'Every week',

                        // Job types
                        ANALYTICS_TABLE: 'Analytics Table',
                        CREDENTIALS_EXPIRY_ALERT: 'Credential Expiry Alert',
                        DATA_INTEGRITY: 'Data Integrity',
                        DATA_SET_NOTIFICATION: 'Data Set Notification',
                        DATA_SYNC: 'Data Synchronization',
                        DATA_STATISTICS: 'Data Statistics',
                        FILE_RESOURCE_CLEANUP: 'File Resource Cleanup',
                        META_DATA_SYNC: 'Metadata Synchronization',
                        MONITORING: 'Monitoring',
                        PREDICTOR: 'Predictor',
                        PROGRAM_NOTIFICATIONS: 'Program Notifications',
                        PUSH_ANALYSIS: 'Push Analysis',
                        RESOURCE_TABLE: 'Resource Table',
                        SEND_SCHEDULED_MESSAGE: 'Send Scheduled Message',
                        VALIDATION_RESULTS_NOTIFICATION: 'Validation Results Notification',

                        // Job parameters
                        'Last years': 'Last years',
                        'Persist results': 'Persist results',
                        'Push analysis': 'Push analysis',
                        'Relative end': 'Relative end',
                        'Relative start': 'Relative start',
                        'Send notifications': 'Send notifications',
                        'Skip resource tables': 'Skip resource tables',
                        'Skip table types': 'Skip table types',
                        'Validation rule groups': 'Validation rule groups',
                        Predictors: 'Predictors',
                    },
                },
            },
        },
        () => {
            d2.currentUser.userSettings.get('keyUiLocale').then(uiLocale => {
                if (uiLocale && uiLocale !== 'en') {
                    i18next.changeLanguage(uiLocale);
                }
            });
        },
    );
};

export default initializeI18n;
