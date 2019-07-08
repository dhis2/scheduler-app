import { normalize } from 'normalizr'
import { jobs } from './schemas'

describe('schema', () => {
    it('should normalize jobs', () => {
        const data = {
            id: 1,
        }
        const actual = normalize(data, jobs)
        const expected = {
            entities: {
                jobs: {
                    1: { id: 1 },
                },
            },
            result: 1,
        }

        expect(actual).toEqual(expected)
    })
})
