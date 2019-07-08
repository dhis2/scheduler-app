import 'isomorphic-fetch'
import fetchy from './fetchy'

window.fetch = jest.fn()
window.Headers = jest.fn()

describe('fetchy', () => {
    it('should resolve with the response if the response is ok', () => {
        const body = { data: 'data' }
        const init = { status: 200, statusText: 'OK' }
        const expected = new Response(body, init)

        expect.assertions(1)

        window.fetch.mockImplementationOnce(() =>
            Promise.resolve(new Response(body, init))
        )
        return fetchy('endpoint').then(actual =>
            expect(actual).toEqual(expected)
        )
    })

    it('should reject with an error if the response is not ok', () => {
        const statusText = 'Unauthorized'
        const body = { data: 'data' }
        const init = { status: 401, statusText }

        expect.assertions(1)

        window.fetch.mockImplementationOnce(() =>
            Promise.resolve(new Response(body, init))
        )
        return fetchy('endpoint').catch(error =>
            expect(error.message).toEqual(statusText)
        )
    })

    it('should reject with an error on fetch errors', () => {
        const message = 'No network connection'
        const expected = new Error(message)

        expect.assertions(1)

        window.fetch.mockImplementationOnce(() => Promise.reject(expected))
        return fetchy('endpoint').catch(error =>
            expect(error).toEqual(expected)
        )
    })
})
