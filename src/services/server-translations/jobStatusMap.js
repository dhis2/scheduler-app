import i18n from '@dhis2/d2-i18n'

const jobStatusMap = {
    COMPLETED: i18n.t('Completed'),
    DISABLED: i18n.t('Disabled'),
    DONE: i18n.t('Done'),
    FAILED: i18n.t('Failed'),
    NOT_STARTED: i18n.t('Not started'),
    RUNNING: i18n.t('Running'),
    SCHEDULED: i18n.t('Scheduled'),
    STOPPED: i18n.t('Stopped'),
}

export default jobStatusMap
