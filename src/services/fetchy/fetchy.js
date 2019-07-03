/**
 * Return the response if it is ok, otherwise throw an error.
 */

const onFulfilled = response => {
    if (response.ok) {
        return response
    }

    throw new Error(response.statusText)
}

const fetchy = (...args) => fetch(...args).then(onFulfilled)

export default fetchy
