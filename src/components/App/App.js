import React from 'react'
import { CssVariables } from '@dhis2/ui'
import { useLocale } from '../../hooks/locale'
import { LocaleContext } from '../Context'
import { Routes } from '../Routes'
import { PageWrapper } from '../PageWrapper'
import './App.css'

const App = () => {
    const locale = useLocale()

    return (
        <LocaleContext.Provider value={locale}>
            <CssVariables spacers colors />
            <PageWrapper>
                <Routes />
            </PageWrapper>
        </LocaleContext.Provider>
    )
}

export default App
