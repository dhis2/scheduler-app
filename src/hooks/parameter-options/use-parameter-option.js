import useParameterOptions from './use-parameter-options'

const useParameterOption = (parameter) => {
    const fetch = useParameterOptions()

    // Select required parameter when there is data
    if (fetch.data) {
        const data = fetch.data?.[parameter]

        if (!data) {
            const error = new Error(
                'Did not receive the expected parameter option'
            )
            return { ...fetch, error, data: undefined }
        }

        return { ...fetch, data }
    }

    return fetch
}

export default useParameterOption
