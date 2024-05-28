import React from 'react'
import { CssVariables } from '@dhis2/ui'
import { Routes } from '../Routes'
import { AuthWall } from '../AuthWall'
import { Store } from '../Store'
import { PageWrapper } from '../PageWrapper'
import './App.css'

/* eslint-disable-next-line import/no-unassigned-import -- Necessary for translations to work */
import '../../locales'

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
