import { string } from '@dhis2/prop-types'
import cronstrue from 'cronstrue/i18n'
import { useGetUserSettings, selectors } from '../../hooks/user-settings'

const HumanReadableCron = ({ cronExpression }) => {
    const { loading, error, data } = useGetUserSettings()

    if (loading) {
        return null
    }

    // Fall back to default locale in case of errors (English for cronstrue)
    if (error) {
        return cronstrue.toString(cronExpression)
    }

    const locale = selectors.getLocale(data)

    return cronstrue.toString(cronExpression, { locale })
}

HumanReadableCron.propTypes = {
    cronExpression: string.isRequired,
}

export default HumanReadableCron
