import React from 'react'
import { CssVariables } from '@dhis2/ui'
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
