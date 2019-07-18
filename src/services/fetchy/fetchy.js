const fallbackMessage =
    'Something went wrong, but no errormessage was provided.'

const fetchy = async (url, options = {}) => {
    const settings = {
        ...options,
        credentials: 'include',
        headers: {
            'x-requested-with': 'XMLHttpRequest',
            accept: 'application/json',
            ...options.headers,
        },
    }
    let response

    // Handle fetch errors
    try {
        response = await fetch(url, settings)
    } catch (error) {
        throw new Error(
            'Something went wrong whilst retrieving data. Check if you have a working internet connection.'
        )
    }

    // Handle successful responses
    if (response.ok) {
        try {
            const data = await response.json()

            return data
        } catch (e) {
            throw new Error(
                'The response succeeded, but contained invalid JSON.'
            )
        }
    }

    // Handle error responses
    const error = new Error('')
    error.details = []

    try {
        const data = await response.json()
        const hasMessage =
            data.message &&
            typeof data.message === 'string' &&
            data.message.length > 0
        const hasDetails =
            data.response &&
            data.response.errorReports &&
            data.response.errorReports.length > 0

        if (hasMessage) {
            error.message = data.message
        }

        if (hasDetails) {
            data.response.errorReports.forEach(({ message }) => {
                if (message) {
                    error.details.push(message)
                }
            })
        }
    } catch (e) {
        throw new Error(
            'The request did not succeed and did not contain valid JSON.'
        )
    }

    if (!error.message) {
        const { statusText } = response
        const hasStatusText =
            statusText &&
            typeof statusText === 'string' &&
            statusText.length > 0

        error.message = hasStatusText ? statusText : fallbackMessage
    }

    throw error
}

export default fetchy
