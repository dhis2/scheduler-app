import i18n from '@dhis2/d2-i18n'

const jobTypesMap = {
    ANALYTICS_TABLE: i18n.t('Analytics table'),
    CONTINUOUS_ANALYTICS_TABLE: i18n.t('Continuous analytics table'),
    CREDENTIALS_EXPIRY_ALERT: i18n.t('Credentials expiry alert'),
    DATA_INTEGRITY: i18n.t('Data integrity'),
    DATA_SET_NOTIFICATION: i18n.t('Dataset notification'),
    DATA_STATISTICS: i18n.t('Data statistics'),
    DATA_SYNC: i18n.t('Data synchronization'),
    EVENT_PROGRAMS_DATA_SYNC: i18n.t('Event programs data sync'),
    FILE_RESOURCE_CLEANUP: i18n.t('File resource clean up'),
    META_DATA_SYNC: i18n.t('Metadata synchronization'),
    MONITORING: i18n.t('Monitoring'),
    PREDICTOR: i18n.t('Predictor'),
    PROGRAM_NOTIFICATIONS: i18n.t('Program notifications'),
    PUSH_ANALYSIS: i18n.t('Push analysis'),
    REMOVE_EXPIRED_RESERVED_VALUES: i18n.t('Remove expired reserved values'),
    RESOURCE_TABLE: i18n.t('Resource table'),
    SEND_SCHEDULED_MESSAGE: i18n.t('Send scheduled message'),
    TRACKER_PROGRAMS_DATA_SYNC: i18n.t('Tracker programs data sync'),
    VALIDATION_RESULTS_NOTIFICATION: i18n.t('Validation results notification'),
    DISABLE_INACTIVE_USERS: i18n.t('Disable inactive users'),
}

export default jobTypesMap
