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
                        are_you_sure_you_want_to_execute: 'Are you sure you want to execute',
                        execute: 'Execute',
                        attributes: 'Attributes',
                        cancel: 'Cancel',
                        details: 'Details',
                        click_to_select: 'Click to select',
                        run_now: 'Run now',
                        confirm: 'Confirm',
                        continuous_execution: 'Continuous execution',
                        could_not_create_job: 'Could not create job',
                        could_not_update_job: 'Could not update job',
                        could_not_find_job: 'Could not find job',
                        could_not_run_job: 'Could not run job',
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
                        delete: 'Delete',
                        successfully_created_job: 'Successfully created job',
                        successfully_deleted_job: 'Successfully deleted job',
                        successfully_updated_job: 'Successfully updated job',
                        type: 'Type',
                        not_authorized_message: 'You are not authorized to use this app',
                        must_be_of_two_or_more_characters: 'Must be of two or more characters',
                        show_system_jobs: 'Show system jobs',
                        no_jobs_to_show: 'No jobs to show',

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
                        REMOVE_EXPIRED_RESERVED_VALUES: 'Remove Expired Reserved Values',

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

                        // Skip table types
                        DATA_VALUE: 'Data Value',
                        COMPLETENESS: 'Completeness',
                        COMPLETENESS_TARGET: 'Completeness Target',
                        ORG_UNIT_TARGET: 'Organisation Unit Target',
                        EVENT: 'Event',
                        ENROLLMENT: 'Enrollment',
                        VALIDATION_RESULT: 'Validation Result',
                    },
                },
                ur: {
                    translation: {
                        add_new_job: 'نئی ملازمت شامل کریں',
                        are_you_sure_you_want_to_delete: 'کیا آپ واقعی حذف کرنا چاہتے ہیں؟',
                        are_you_sure_you_want_to_discard_your_changes:
                            'کیا آپ واقعی اپنے تبدیلیاں ضائع کرنا چاہتے ہیں؟',
                        attributes: 'خصوصیات',
                        cancel: 'منسوخ کریں',
                        details: 'تفصیلات',
                        click_to_select: 'منتخب کرنے کے لئے کلک کریں',
                        confirm: 'تصدیق کریں',
                        continuous_execution: 'مسلسل عملدرآمد',
                        could_not_create_job: 'کام پیدا نہیں کر سکا',
                        could_not_update_job: 'ملازمت کو اپ ڈیٹ نہیں کر سکا',
                        could_not_find_job: 'ملازمت نہیں مل سکی',
                        cron_expression: 'کرون اظہار',
                        invalid_cron_expression: 'غلط کرون کا اظہار',
                        delete_job: 'ملازمت کو حذف کریں',
                        enabled: 'فعال',
                        end_time: 'آخر وقت',
                        job_type: 'ملازمت کی قسم',
                        name: 'نام',
                        next_execution: 'اگلا پھانسی',
                        required: 'ضرورت ہے',
                        save_changes: 'تبدیلیاں محفوظ کرو',
                        scheduled_jobs: 'شیڈول کردہ ملازمتیں',
                        select_frequency: 'تعدد منتخب کریں',
                        start_time: 'وقت آغاز',
                        status: 'حالت',
                        submit: 'جمع',
                        delete: 'حذف کریں',
                        successfully_created_job: 'کامیابی سے کام پیدا',
                        successfully_deleted_job: 'کامیابی سے کام ختم ہوگیا',
                        successfully_updated_job: 'کامیابی سے نوکری کو اپ ڈیٹ کیا',
                        type: 'ٹائپ کریں',
                        not_authorized_message: 'آپ کو اس ایپ کو استعمال کرنے کا اختیار نہیں ہے',
                        must_be_of_two_or_more_characters: 'دو یا زیادہ حروف ہونا ضروری ہے',

                        created: 'تخلیق',
                        last_executed: 'آخری پھانسی',
                        last_execution_status: 'آخری پھانسی کی حیثیت',

                        // Job statuses
                        DISABLED: 'معذور',
                        SCHEDULED: 'شیڈول کردہ',
                        RUNNING: 'چل رہا ہے',
                        COMPLETED: 'مکمل',
                        FAILED: 'ناکام',

                        // Cron expressions
                        CUSTOM: 'اپنی مرضی کے مطابق',
                        EVERY_HOUR: 'ہر گھنٹے',
                        EVERY_DAY_MIDNIGHT: 'آدھی رات ہر روز',
                        EVERY_DAY_THREE_AM: 'ہر روز 3 بجے',
                        EVERY_WEEKDAY_NOON: 'دوپہر میں ہر روز',
                        EVERY_WEEK: 'ہر ہفتے',

                        // Job types
                        ANALYTICS_TABLE: 'تجزیہ ٹیبل',
                        CREDENTIALS_EXPIRY_ALERT: 'معتبر ختم ہونے والی انتباہ',
                        DATA_INTEGRITY: 'ڈیٹا کی سالمیت',
                        DATA_SET_NOTIFICATION: 'ڈیٹا سیٹ نوٹیفیکیشن',
                        DATA_SYNC: 'ڈیٹا ہم آہنگی',
                        DATA_STATISTICS: 'ڈیٹا کے اعداد و شمار',
                        FILE_RESOURCE_CLEANUP: 'فائل وسائل صفائی',
                        META_DATA_SYNC: 'میٹاٹاٹا ہم آہنگی',
                        MONITORING: 'نگرانی',
                        PREDICTOR: 'پیشن گوئی',
                        PROGRAM_NOTIFICATIONS: 'پروگرام نوٹیفکیشن',
                        PUSH_ANALYSIS: 'تجزیہ پش',
                        RESOURCE_TABLE: 'وسائل ٹیبل',
                        SEND_SCHEDULED_MESSAGE: 'شیڈول شدہ پیغام بھیجیں',
                        VALIDATION_RESULTS_NOTIFICATION: 'توثیق کے نتائج کی اطلاع',

                        // Job parameters
                        'Last years': 'گزشتہ سال',
                        'Persist results': 'پیدائش کے نتائج',
                        'Push analysis': 'تجزیہ پش',
                        'Relative end': 'رشتہ دار اختتام',
                        'Relative start': 'رشتہ دار آغاز',
                        'Send notifications': 'اطلاعات بھیجیں',
                        'Skip resource tables': 'وسائل کی میزیں چھوڑ دیں',
                        'Skip table types': 'ٹیبل کی اقسام کو چھوڑ دو',
                        'Validation rule groups': 'توثیقی قاعدہ گروپ',
                        Predictors: 'پیشن گوئی',
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
