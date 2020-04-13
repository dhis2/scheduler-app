import { PropTypes } from '@dhis2/prop-types'
import { useHumanReadableCron } from '../../hooks/human-readable-cron'

const HumanReadableCron = ({ cronExpression }) => {
    const humanReadableCron = useHumanReadableCron(cronExpression)

    return humanReadableCron
}

const { string } = PropTypes

HumanReadableCron.propTypes = {
    cronExpression: string.isRequired,
}

export default HumanReadableCron
