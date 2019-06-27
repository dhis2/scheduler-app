import { theme, colors } from '@dhis2/ui-core'

const root = document.documentElement

const CssVariables = () => {
    Object.keys(theme).forEach(key => {
        root.style.setProperty(`--theme-${key}`, theme[key])
    })

    Object.keys(colors).forEach(key => {
        root.style.setProperty(`--colors-${key}`, colors[key])
    })

    return null
}

export default CssVariables
