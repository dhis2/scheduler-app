export const validFields = fields => (fields && fields.length === 6);

// Lightweight validation of CronExpression, following the Spring Scheduling pattern:
// - Documentation: https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/scheduling/support/CronSequenceGenerator.html
// - Source code: https://git.io/vpoqG
const validCronExpression = exp => {
    if (!exp) {
        return false;
    }

    const fields = exp.trim().split(' ');
    if (!validFields(fields)) {
        return false;
    }

    return true;
};

export default validCronExpression;
