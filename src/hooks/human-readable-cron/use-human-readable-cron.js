import cronstrue from 'cronstrue/i18n'
import { useGetUserSettings, selectors } from '../user-settings'
import { validateCron } from '../../services/validators'

const useHumanReadableCron = cron => {
    const { loading, error, data } = useGetUserSettings()
    const isValid = cron && validateCron(cron)

    if (loading || !isValid) {
        return ''
    }

    // Fall back to default locale in case of errors (English for cronstrue)
    if (error) {
        return cronstrue.toString(cron)
    }

    const locale = selectors.getLocale(data)

    return cronstrue.toString(cron, { locale })
}

export default useHumanReadableCron
