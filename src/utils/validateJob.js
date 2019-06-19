import i18n from '@dhis2/d2-i18n';
import validCronExpression from './validCronExpression';

const validateJob = values => {
    const { name, continuousExecution, cronExpression } = values;
    const errors = {};

    if (!name) {
        errors.name = i18n.t('Required');
    }

    if (name.length < 2) {
        errors.name = i18n.t('Must be of two or more characters');
    }

  if (!continuousExecution) {
      if (!cronExpression) {
          errors.cronExpression = i18n.t('Required');
      }

      if (cronExpression && !validCronExpression(cronExpression)) {
          errors.cronExpression = i18n.t('Invalid cron expression');
      }
  }

  return errors;
};

export default validateJob;
