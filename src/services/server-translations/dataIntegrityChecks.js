import i18n from '@dhis2/d2-i18n'

const dataIntegrityChecksMap = {
    program_indicators_with_invalid_expressions: i18n.t(
        'Program indicators with invalid expressions'
    ),
    data_elements_without_groups: i18n.t('Data elements without groups'),
    indicators_with_invalid_numerator: i18n.t(
        'Indicators with invalid numerator'
    ),
    program_rule_actions_without_notification: i18n.t(
        'Program rule actions without notification'
    ),
    categories_one_default_category_combo: i18n.t(
        'Only one "default" category combo should exist'
    ),
    data_elements_without_data_sets: i18n.t('Data elements without data sets'),
    category_combos_being_invalid: i18n.t('Category combos being invalid'),
    indicators_with_identical_formulas: i18n.t(
        'Indicators with identical formulas'
    ),
    indicators_without_groups: i18n.t('Indicators without groups'),
    data_elements_in_data_set_not_in_form: i18n.t(
        'Data elements in data set not in form'
    ),
    program_rules_without_priority: i18n.t('Program rules without priority'),
    validation_rules_without_groups: i18n.t('Validation rules without groups'),
    program_indicators_with_invalid_filters: i18n.t(
        'Program indicators with invalid filters'
    ),
    categories_no_options: i18n.t('Categories with no category options'),
    program_rules_without_condition: i18n.t('Program rules without condition'),
    program_rule_actions_without_stage: i18n.t(
        'Program rule actions without stage'
    ),
    categories_one_default_category: i18n.t(
        'Only one "default" category should exist'
    ),
    categories_unique_category_combo: i18n.t(
        'Lists category combos that share a combination of categories with at least one other category combo'
    ),
    org_units_with_cyclic_references: i18n.t(
        'Org units with cyclic references'
    ),
    program_rule_variables_without_data_element: i18n.t(
        'Program rule variables without data element'
    ),
    validation_rules_with_invalid_right_side_expression: i18n.t(
        'Validation rules with invalid right side expression'
    ),
    data_sets_not_assigned_to_org_units: i18n.t(
        'Data sets not assigned to org units'
    ),
    data_elements_violating_exclusive_group_sets: i18n.t(
        'Data elements violating exclusive group sets'
    ),
    org_unit_groups_without_group_sets: i18n.t(
        'Org unit groups without group sets'
    ),
    program_rule_variables_without_attribute: i18n.t(
        'Program rule variables without attribute'
    ),
    org_units_violating_exclusive_group_sets: i18n.t(
        'Org units violating exclusive group sets'
    ),
    program_rule_actions_without_data_object: i18n.t(
        'Program rule actions without data object'
    ),
    categories_one_default_category_option: i18n.t(
        'Only one "default" category option should exist'
    ),
    categories_one_default_category_option_combo: i18n.t(
        'Only one "default" category option combo should exist'
    ),
    org_units_without_groups: i18n.t('Org units without groups'),
    program_indicators_without_expression: i18n.t(
        'Program indicators without expression'
    ),
    indicators_violating_exclusive_group_sets: i18n.t(
        'Indicators violating exclusive group sets'
    ),
    periods_duplicates: i18n.t('Periods duplicates'),
    data_elements_assigned_to_data_sets_with_different_period_types: i18n.t(
        'Data elements assigned to data sets with different period types'
    ),
    program_rules_without_action: i18n.t('Program rules without action'),
    org_units_being_orphaned: i18n.t('Org units being orphaned'),
    validation_rules_with_invalid_left_side_expression: i18n.t(
        'Validation rules with invalid left side expression'
    ),
    indicators_with_invalid_denominator: i18n.t(
        'Indicators with invalid denominator'
    ),
    program_rule_actions_without_section: i18n.t(
        'Program rule actions without section'
    ),
}

export const severityMap = {
    WARNING: i18n.t('Warning'),
    SEVERE: i18n.t('Severe'),
}

const snakeCaseToHumanReadable = string => {
    const split = string.split('_')
    const [first, ...rest] = split
    return first[0]
        .toUpperCase()
        .concat(first.slice(1))
        .concat(` ${rest.join(' ')}`)
}

export const getCheckName = name => {
    let mappedName = dataIntegrityChecksMap[name]
    if (!mappedName) {
        mappedName = snakeCaseToHumanReadable(name)
    }
    return mappedName
}
