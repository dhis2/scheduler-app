import JobNameField, {
    FIELD_NAME as JOB_NAME,
    VALIDATOR as JOB_NAME_VALIDATOR,
} from './JobNameField'
import { FIELD_NAME as CRON, VALIDATOR as CRON_VALIDATOR } from './CronField'
import JobTypeField, {
    FIELD_NAME as JOB_TYPE,
    VALIDATOR as JOB_TYPE_VALIDATOR,
} from './JobTypeField'
import ParameterFields from './ParameterFields'
import ScheduleField from './ScheduleField'

const fieldNames = {
    JOB_NAME,
    JOB_TYPE,
    CRON,
}

const validators = {
    JOB_NAME_VALIDATOR,
    JOB_TYPE_VALIDATOR,
    CRON_VALIDATOR,
}

export {
    JobNameField,
    ScheduleField,
    JobTypeField,
    ParameterFields,
    fieldNames,
    validators,
}
