import cronstrue from 'cronstrue/i18n'
import { useContext } from 'react'
import { validateCron } from '../../services/validators'
import { LocaleContext } from '../../components/Context'

const useHumanReadableCron = cronExpression => {
    const locale = useContext(LocaleContext)
    const isValid = cronExpression && validateCron(cronExpression)

    if (!locale || !isValid) {
        return ''
    }

    return cronstrue.toString(cronExpression, { locale })
}

export default useHumanReadableCron
