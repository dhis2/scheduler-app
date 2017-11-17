export const PARAMS = {
    INTEGER: 'java.lang.Integer',
    STRING: 'java.lang.String',
    HACK: 'org.hisp.dhis.validation.ValidationRuleGroup',
    BOOLEAN: 'java.lang.Boolean',
    DATE: 'java.util.Date',
    SET: 'java.util.Set',
    LIST: 'java.util.List',
    PERIOD: 'org.hisp.dhis.period.Period',
    ORGUNIT: 'org.hisp.dhis.organisationunit.OrganisationUnit',
}

export const COMPONENTS = {
    INPUT: 'INPUT',
    INPUT_LIST: 'INPUT_LIST',
    SELECTION: 'SELECTION',
    SUGGESTION: 'SUGGESTION',
    SUGGESTION_LIST: 'SUGGESTION_LIST',
    TOGGLE: 'TOGGLE',
    DATE: 'DATE',
    PERIOD: 'PERIOD',
    PERIOD_LIST: 'PERIOD_LIST',
    UNKNOWN: 'UNKNOWN',
};

export const getDefaultParameterValue = type => {
    switch (type) {
        case PARAMS.INTEGER: return undefined;
        case PARAMS.STRING: return '';
        case PARAMS.BOOLEAN: return false;
        case PARAMS.LIST: return [];
        case PARAMS.SET: return [];
        case PARAMS.ORGUNIT: return undefined;
        case PARAMS.DATE: return null;
        default: return undefined;
    }
}

export const determineRenderedComponent = ({ type, itemType, options }) => {
    const typeIs = component => type === component;
    const itemIs = component => itemType === component;

    if (options.length > 0) {
        if (typeIs(PARAMS.SET))
            return COMPONENTS.SELECTION;
    
        return typeIs(PARAMS.LIST)
            ? COMPONENTS.SUGGESTION_LIST
            : COMPONENTS.SUGGESTION;
    }

    if (typeIs(PARAMS.LIST)) {
        if (itemIs(PARAMS.STRING) || itemIs(PARAMS.INTEGER))
            return COMPONENTS.INPUT_LIST;

        if (itemIs(PARAMS.PERIOD))
            return COMPONENTS.PERIOD_LIST;
    }

    switch (type) {
        case PARAMS.STRING:
        case PARAMS.INTEGER: return COMPONENTS.INPUT;
        case PARAMS.BOOLEAN: return COMPONENTS.TOGGLE;
        case PARAMS.PERIOD: return COMPONENTS.PERIOD;
        case PARAMS.DATE: return COMPONENTS.DATE;
        default: return COMPONENTS.UNKNOWN;
    }
}