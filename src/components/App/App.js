import React from 'react'
import { CssReset } from '@dhis2/ui-core'
import { HeaderBar } from '@dhis2/ui-widgets'
import { DataProvider } from '@dhis2/app-runtime'
import Routes from '../Routes'
import CssVariables from '../CssVariables'

const { REACT_APP_DHIS2_BASE_URL } = process.env

const App = () => (
    <DataProvider baseUrl={REACT_APP_DHIS2_BASE_URL} apiVersion="">
        <CssReset />
        <CssVariables />
        <HeaderBar appName="Scheduler" />
        <Routes />
    </DataProvider>
)

export default App
