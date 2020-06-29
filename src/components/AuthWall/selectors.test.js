import { getAuthorized } from './selectors'

describe('getAuthorized', () => {
    it('should return false if there are no authorities', () => {
        expect(getAuthorized({})).toBe(false)
    })

    it('should return true if the authorities include ALL', () => {
        const me = {
            authorities: ['ALL'],
        }

        expect(getAuthorized(me)).toBe(true)
    })

    it('should return true if the authorities include F_SCHEDULING_ADMIN', () => {
        const me = {
            authorities: ['F_SCHEDULING_ADMIN'],
        }

        expect(getAuthorized(me)).toBe(true)
    })
})
