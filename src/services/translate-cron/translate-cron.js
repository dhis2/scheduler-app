import cronstrue from 'cronstrue/i18n'
import i18n from '@dhis2/d2-i18n'
import { validateCron } from '../validators'

const fallback = 'en'

const translateCron = (cron) => {
    const locale = i18n.language || fallback
    const isValid = cron && validateCron(cron)

    if (!isValid) {
        return ''
    }

    return cronstrue.toString(cron, { locale })
}

export default translateCron
