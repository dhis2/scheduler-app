import React from 'react'
import { CssVariables } from '@dhis2/ui-core'
import { Routes } from '../Routes'
import { PageWrapper } from '../PageWrapper'
import './App.css'

const App = () => (
    <React.Fragment>
        <CssVariables spacers colors />
        <PageWrapper>
            <Routes />
        </PageWrapper>
    </React.Fragment>
)

export default App
