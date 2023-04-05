import useParameterOptions from './use-parameter-options'

const useParameterOption = (parameter) => {
    const fetch = useParameterOptions()

    // Select required parameter when there is data
    if (fetch.data) {
        const hasParameter = parameter in fetch.data

        if (!hasParameter) {
            const error = new Error('Parameter could not be found')
            return { ...fetch, error }
        }

        const data = fetch.data[parameter]

        return { ...fetch, data }
    }

    return fetch
}

export default useParameterOption
