import i18n from '@dhis2/d2-i18n'

const analyticsTableTypes = {
    COMPLETENESS: i18n.t('Completeness'),
    COMPLETENESS_TARGET: i18n.t('Completeness target'),
    DATA_VALUE: i18n.t('Data value'),
    ENROLLMENT: i18n.t('Enrollment'),
    EVENT: i18n.t('Event'),
    ORG_UNIT_TARGET: i18n.t('Org unit target'),
    OWNERSHIP: i18n.t('Ownership'),
    TRACKED_ENTITY_INSTANCE_ENROLLMENTS: i18n.t(
        'Tracked entity instance enrollments'
    ),
    TRACKED_ENTITY_INSTANCE_EVENTS: i18n.t('Tracked entity instance events'),
    TRACKED_ENTITY_INSTANCE: i18n.t('Tracked entity instance'),
    VALIDATION_RESULT: i18n.t('Validation result'),
}

export default analyticsTableTypes
