import StoreContext from './StoreContext'

describe('StoreContext', () => {
    it('exports an object with provider and consumer', () => {
        expect('Provider' in StoreContext).toBe(true)
        expect('Consumer' in StoreContext).toBe(true)
    })
})
