export const getLocale = data => {
    const { keyUiLocale } = data

    if (!keyUiLocale) {
        return ''
    }

    return keyUiLocale
}
