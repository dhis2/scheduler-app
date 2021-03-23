import React from 'react'
import { CssVariables } from '@dhis2/ui'
import { Routes } from '../Routes'
import { AuthWall } from '../AuthWall'
import { Store } from '../Store'
import { PageWrapper } from '../PageWrapper'
import './App.css'

// eslint-disable-next-line import/no-unassigned-import
import '../../locales'
// The above is necessary for translations to work

const App = () => (
    <React.Fragment>
        <CssVariables spacers colors theme />
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
