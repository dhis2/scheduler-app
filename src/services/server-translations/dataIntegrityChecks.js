import i18n from '@dhis2/d2-i18n'

export const severityMap = {
    WARNING: i18n.t('Warning'),
    SEVERE: i18n.t('Severe'),
}

const reportTypeMap = {
    REPORT: i18n.t('Report'),
    SUMMARY: i18n.t('Summary'),
    DETAILS: i18n.t('Details'),
}

const snakeCaseToHumanReadable = (string) => {
    const split = string.split('_')
    const [first, ...rest] = split
    return first[0]
        .toUpperCase()
        .concat(first.slice(1))
        .concat(` ${rest.join(' ')}`)
}

export const getReportTypeLabel = (type) =>
    reportTypeMap[type] || snakeCaseToHumanReadable(type)
