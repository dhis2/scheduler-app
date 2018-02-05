import { determineComponentToRender as determine } from 'api/interface';

const orgUnitSamples = [
    { displayName: 'OrgUnit1', value: 'v' },
    { displayName: 'OrgUnit2', value: 'u' },
];

const samples = {
    string: { type: 'java.lang.String' },
    integer: { type: 'java.lang.Integer' },
    boolean: { type: 'java.lang.Boolean' },
    period: { type: 'org.hisp.dhis.period.Period' },
    date: { type: 'java.util.Date' },

    stringList: {
        type: 'java.util.List',
        itemType: 'java.lang.String',
    },
    integerList: {
        type: 'java.util.List',
        itemType: 'java.lang.Integer',
    },
    periodList: {
        type: 'java.util.List',
        itemType: 'org.hisp.dhis.period.Period',
    },
    booleanList: {
        type: 'java.util.List',
        itemType: 'java.lang.Boolean',
    },
    stringSetWithOptions: {
        type: 'java.util.Set',
        itemType: 'java.lang.String',
        options: ['ONE_OPTION', 'ANOTHER_OPTION'],
    },
    integerSetWithOptions: {
        type: 'java.util.Set',
        itemType: 'java.lang.Integer',
        options: [1, 2],
    },
    stringListWithOptions: {
        type: 'java.util.List',
        itemType: 'java.lang.String',
        options: ['ONE_OPTION', 'ANOTHER_OPTION'],
    },
    integerListWithOptions: {
        type: 'java.util.List',
        itemType: 'java.lang.Integer',
        options: ['ONE_OPTION', 'ANOTHER_OPTION'],
    },
    orgUnitWithOptions: {
        type: 'org.hisp.dhis.organisationunit.OrganisationUnit',
        options: orgUnitSamples,
    },
    orgUnitListWithOptions: {
        type: 'java.util.List',
        itemType: 'org.hisp.dhis.organisationunit.OrganisationUnit',
        options: orgUnitSamples,
    },
    orgUnitList: {
        type: 'org.hisp.dhis.organisationunit.OrganisationUnit',
    },
};

describe('interface between App and API', () => {
    describe('rendering parameters without options', () => {
        test('parameters expecting a string or integer should render as an Input', () => {
            expect(determine(samples.string)).toBe('INPUT');
            expect(determine(samples.integer)).toBe('INPUT');
        });

        test('parameters expecting a boolean should render as a Switch', () => {
            expect(determine(samples.boolean)).toBe('TOGGLE');
        });

        test('parameters expecting a date should render as a Date picker', () => {
            expect(determine(samples.date)).toBe('DATE');
        });

        test('parameters expecting a period should render as a Period picker', () => {
            expect(determine(samples.period)).toBe('PERIOD');
        });

        test('parameters expecting a list of strings or integers should render as an Input list', () => {
            expect(determine(samples.stringList)).toBe('INPUT_LIST');
            expect(determine(samples.integerList)).toBe('INPUT_LIST');
        });

        test('parameters expecting a list of periods should render as a Period list', () => {
            expect(determine(samples.periodList)).toBe('PERIOD_LIST');
        });

        test('parameters expecting a list of anything else, without options, is not supported', () => {
            expect(determine(samples.booleanList)).toBe('UNKNOWN');
            expect(determine(samples.orgUnitList)).toBe('UNKNOWN');
        });
    });

    describe('rendering parameters with external options', () => {
        test('parameters including an exclusive list of strings or integers should render as a selection', () => {
            expect(determine(samples.stringSetWithOptions)).toBe('SELECTION');
            expect(determine(samples.integerSetWithOptions)).toBe('SELECTION');
        });

        test('parameters including an inclusive list with suggestions', () => {
            expect(determine(samples.stringListWithOptions)).toBe('SUGGESTION_LIST');
            expect(determine(samples.integerListWithOptions)).toBe('SUGGESTION_LIST');
        });

        test('parameters including options and expecting only one item', () => {
            expect(determine(samples.orgUnitWithOptions)).toBe('SUGGESTION');
        });
    });
});
