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
};

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
        case PARAMS.INTEGER:
            return undefined;
        case PARAMS.STRING:
            return '';
        case PARAMS.BOOLEAN:
            return false;
        case PARAMS.LIST:
            return [];
        case PARAMS.SET:
            return [];
        case PARAMS.ORGUNIT:
            return undefined;
        case PARAMS.DATE:
            return null;
        default:
            return undefined;
    }
};

export const determineComponentToRender = ({ type, itemType, options }) => {
    const typeIs = component => type === component;
    const itemIs = component => itemType === component;

    if (options) {
        if (options.length > 0) {
            // Parameter has options
            if (typeIs(PARAMS.SET)) {
                // Options are exclusive, user should only be able to pick from those.
                return COMPONENTS.SELECTION;
            } else if (typeIs(PARAMS.LIST)) {
                // Options are inclusive, they are merely suggestions.
                return COMPONENTS.SUGGESTION_LIST;
            }

            // Only one item is expected.
            return COMPONENTS.SUGGESTION;
        }

        // Parameter should have options, but none were found.
        return COMPONENTS.SUGGESTION;
    }

    if (typeIs(PARAMS.LIST)) {
        // Parameter expects a list of items.
        if (itemIs(PARAMS.STRING) || itemIs(PARAMS.INTEGER)) {
            // Items are primitive and can be added through an input field.
            return COMPONENTS.INPUT_LIST;
        }

        if (itemIs(PARAMS.PERIOD)) {
            return COMPONENTS.PERIOD_LIST;
        }

        // List of other types, but without any options are not supported.
        return COMPONENTS.UNKNOWN;
    }

    switch (type) {
        case PARAMS.STRING:
        case PARAMS.INTEGER:
            return COMPONENTS.INPUT;
        case PARAMS.BOOLEAN:
            return COMPONENTS.TOGGLE;
        case PARAMS.PERIOD:
            return COMPONENTS.PERIOD;
        case PARAMS.DATE:
            return COMPONENTS.DATE;
        default:
            return COMPONENTS.UNKNOWN;
    }
};
