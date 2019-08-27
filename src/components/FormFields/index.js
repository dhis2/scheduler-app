import JobNameField, {
    FIELD_NAME as JOB_NAME,
    VALIDATOR as JOB_NAME_VALIDATOR,
} from './JobNameField'
import CronField, {
    FIELD_NAME as CRON,
    VALIDATOR as CRON_VALIDATOR,
} from './CronField'
import JobTypeField, {
    FIELD_NAME as JOB_TYPE,
    VALIDATOR as JOB_TYPE_VALIDATOR,
} from './JobTypeField'
import { FIELD_NAME as CONTINUOUS_EXECUTION } from './ContinuousExecutionField'
import JobScheduleField from './JobScheduleField'
import ParameterCollectionField from './ParameterCollectionField'

const fieldNames = {
    JOB_NAME,
    JOB_TYPE,
    CRON,
    CONTINUOUS_EXECUTION,
}

const validators = {
    JOB_NAME_VALIDATOR,
    JOB_TYPE_VALIDATOR,
    CRON_VALIDATOR,
}

export {
    JobNameField,
    JobScheduleField,
    CronField,
    JobTypeField,
    ParameterCollectionField,
    fieldNames,
    validators,
}
