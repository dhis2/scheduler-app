const apiTranslations = {
    en: {
        // Job statuses
        COMPLETED: 'Completed',
        DISABLED: 'Disabled',
        FAILED: 'Failed',
        RUNNING: 'Running',
        SCHEDULED: 'Scheduled',

        // Cron expressions
        CUSTOM: 'Custom',
        EVERY_DAY_MIDNIGHT: 'Every day at midnight',
        EVERY_DAY_THREE_AM: 'Every day at 3 AM',
        EVERY_HOUR: 'Every hour',
        EVERY_WEEK: 'Every week',
        EVERY_WEEKDAY_NOON: 'Every day at noon',

        // Job types
        ANALYTICS_TABLE: 'Analytics Table',
        CONTINUOUS_ANALYTICS_TABLE: 'Continuous Analytics Table',
        CREDENTIALS_EXPIRY_ALERT: 'Credential Expiry Alert',
        DATA_INTEGRITY: 'Data Integrity',
        DATA_SET_NOTIFICATION: 'Data Set Notification',
        DATA_STATISTICS: 'Data Statistics',
        DATA_SYNC: 'Data Synchronization',
        EVENT_PROGRAMS_DATA_SYNC: 'Event Programs Data Sync',
        FILE_RESOURCE_CLEANUP: 'File Resource Cleanup',
        META_DATA_SYNC: 'Metadata Synchronization',
        MONITORING: 'Monitoring',
        PREDICTOR: 'Predictor',
        PROGRAM_DATA_SYNC: 'Program Data Synchronization',
        PROGRAM_NOTIFICATIONS: 'Program Notifications',
        PUSH_ANALYSIS: 'Push Analysis',
        REMOVE_EXPIRED_RESERVED_VALUES: 'Remove Expired Reserved Values',
        RESOURCE_TABLE: 'Resource Table',
        SEND_SCHEDULED_MESSAGE: 'Send Scheduled Message',
        TRACKER_PROGRAMS_DATA_SYNC: 'Tracker Programs Data Sync',
        VALIDATION_RESULTS_NOTIFICATION: 'Validation Results Notification',

        // Job parameters
        'Data values page size': 'Data values page size',
        'Event program page size': 'Event program page size',
        'Full update hour of day': 'Full update hour of day',
        'Last years': 'Last years',
        'Page size': 'Page size',
        'Persist results': 'Persist results',
        'Predictor groups': 'Predictor groups',
        'Push analysis': 'Push analysis',
        'Relative end': 'Relative end',
        'Relative start': 'Relative start',
        'Send notifications': 'Send notifications',
        'Skip resource tables': 'Skip resource tables',
        'Skip table types': 'Skip table types',
        'Tracker program page size': 'Tracker program page size',
        'Validation rule groups': 'Validation rule groups',
        Predictors: 'Predictors',

        // Skip table types
        COMPLETENESS_TARGET: 'Completeness Target',
        COMPLETENESS: 'Completeness',
        DATA_VALUE: 'Data Value',
        ENROLLMENT: 'Enrollment',
        EVENT: 'Event',
        ORG_UNIT_TARGET: 'Organisation Unit Target',
        VALIDATION_RESULT: 'Validation Result',
    },
    ur: {
        // Job statuses
        COMPLETED: 'مکمل',
        DISABLED: 'معذور',
        FAILED: 'ناکام',
        RUNNING: 'چل رہا ہے',
        SCHEDULED: 'شیڈول کردہ',

        // Cron expressions
        CUSTOM: 'اپنی مرضی کے مطابق',
        EVERY_DAY_MIDNIGHT: 'آدھی رات ہر روز',
        EVERY_DAY_THREE_AM: 'ہر روز 3 بجے',
        EVERY_HOUR: 'ہر گھنٹے',
        EVERY_WEEK: 'ہر ہفتے',
        EVERY_WEEKDAY_NOON: 'دوپہر میں ہر روز',

        // Job types
        ANALYTICS_TABLE: 'تجزیہ ٹیبل',
        CREDENTIALS_EXPIRY_ALERT: 'معتبر ختم ہونے والی انتباہ',
        DATA_INTEGRITY: 'ڈیٹا کی سالمیت',
        DATA_SET_NOTIFICATION: 'ڈیٹا سیٹ نوٹیفیکیشن',
        DATA_STATISTICS: 'ڈیٹا کے اعداد و شمار',
        DATA_SYNC: 'ڈیٹا ہم آہنگی',
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

        // Skip table types
        COMPLETENESS_TARGET: 'مکمل طور پر نشانہ بنایا',
        COMPLETENESS: 'مکمل',
        DATA_VALUE: 'ڈیٹا کی قیمت',
        ENROLLMENT: 'داخلہ',
        EVENT: 'فنکشن',
        ORG_UNIT_TARGET: 'تنظیم یونٹ کا ہدف',
        VALIDATION_RESULT: 'توثیقی نتیجہ',
    },
};

export default apiTranslations;
