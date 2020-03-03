import { useDataEngine } from '@dhis2/app-runtime'
import { useState, useEffect } from 'react'

const useGetLabeledOptions = ({ endpoint, parameterName }) => {
    const engine = useDataEngine()
    const [response, setResponse] = useState({
        loading: true,
        error: undefined,
        data: undefined,
    })

    useEffect(() => {
        const query = {
            options: {
                resource: endpoint,
                params: {
                    paging: false,
                },
            },
        }
        const abortController = new AbortController()
        const signal = abortController.signal

        engine
            .query(query, { signal })
            .then(({ options }) => {
                if (!(parameterName in options)) {
                    throw new Error('Invalid response')
                }

                setResponse({
                    loading: false,
                    error: undefined,
                    data: options[parameterName],
                })
            })
            .catch(error => {
                const isAbortError = error.name === 'AbortError'

                // Only set the error if it's not an abort error
                if (!isAbortError) {
                    setResponse({
                        loading: false,
                        error,
                        data: undefined,
                    })
                }
            })

        // Return a cleanup function
        return () => {
            abortController.abort()
        }
    }, [engine, endpoint, parameterName])

    return response
}

export default useGetLabeledOptions
