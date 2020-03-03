import React from 'react'
import { CssReset, CssVariables } from '@dhis2/ui-core'
import { Routes } from '../Routes'
import { PageWrapper } from '../PageWrapper'
import { AuthWall } from '../AuthWall'
import './App.css'

const App = () => (
    <React.Fragment>
        <CssReset />
        <CssVariables spacers />
        <PageWrapper>
            <AuthWall>
                <Routes />
            </AuthWall>
        </PageWrapper>
    </React.Fragment>
)

export default App
