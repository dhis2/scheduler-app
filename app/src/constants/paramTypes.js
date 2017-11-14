export const paramTypes = {
    INTEGER: 'INTEGER',
    STRING: 'STRING',
    BOOLEAN: 'BOOLEAN',
    LIST: 'LIST',
    SET: 'SET',
    PERIOD: 'PERIOD',
    OBJECT: 'OBJECT',
    ORGUNIT: 'ORGUNIT',
    UNDEFINED: 'UNDEFINED'
}

export const klassToParameterType = klass => {
    switch (klass) {
        case undefined: return paramTypes.UNDEFINED
        case 'java.lang.Integer': return paramTypes.INTEGER;
        case 'java.lang.String': return paramTypes.STRING;
        case 'java.lang.Boolean': return paramTypes.BOOLEAN;

        /* LIST parameters are rendered as a string input with suggestions */
        case 'java.util.List': return paramTypes.LIST;

        /* SET parameters are rendered as a multi selection dropdown list */
        case 'java.util.Set': return paramTypes.SET;

        case 'org.hisp.dhis.period.Period': return paramTypes.PERIOD;
        case 'org.hisp.dhis.organisationunit.OrganisationUnit': return paramTypes.ORGUNIT;
        default: return paramTypes.OBJECT;
    }
}

export const getDefaultParameterValue = type => {
    switch (type) {
        case paramTypes.INTEGER: return undefined;
        case paramTypes.STRING: return '';
        case paramTypes.BOOLEAN: return false;
        case paramTypes.LIST: return [];
        case paramTypes.SET: return [];
        case paramTypes.OBJECT: return undefined;
        case paramTypes.ORGUNIT: return undefined;
        default: return undefined;
    }
}