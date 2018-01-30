const { determineComponentToRender } = require('../../app/src/api/interface');

const parameterWithOptionSet = {
    type: 'java.util.Set',
    options: [
        'ONE_OPTION',
        'ANOTHER_OPTION',
    ],
};

test('parameters with a Set of Options should render as a Selection component', () => {
    expect(determineComponentToRender(parameterWithOptionSet)).toBe('SELECTION');
});
