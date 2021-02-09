import React from 'react'
import { CssVariables } from '@dhis2/ui'
import { Routes } from '../Routes'
import { AuthWall } from '../AuthWall'
import { Store } from '../Store'
import { PageWrapper } from '../PageWrapper'
import './App.css'

const App = () => (
    <React.Fragment>
        <CssVariables spacers colors />
        <PageWrapper>
            <AuthWall>
                <Store>
                    <Routes />
                </Store>
            </AuthWall>
        </PageWrapper>
    </React.Fragment>
)

export default App
