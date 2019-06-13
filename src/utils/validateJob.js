import i18n from '@dhis2/d2-i18n';
import validCronExpression from './validCronExpression';

const validateJob = values => {
  const errors = {};
  if (!values.name) {
      errors.name = i18n.t('Required');
  } else if (values.name.length < 2) {
      errors.name = i18n.t('Must be of two or more characters');
  }

  if (!values.continuousExecution) {
      if (!values.cronExpression) {
          errors.cronExpression = i18n.t('Required');
      } else if (!validCronExpression(values.cronExpression)) {
          errors.cronExpression = i18n.t('Invalid cron expression');
      }
  }

  return errors;
};

export default validateJob;
