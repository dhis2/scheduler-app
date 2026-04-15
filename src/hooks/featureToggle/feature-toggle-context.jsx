import { createContext } from 'react'

const FeatureToggleContext = createContext({
    showPushAnalysis: false,
})

export { FeatureToggleContext }
