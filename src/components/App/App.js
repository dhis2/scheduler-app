import React from 'react'
import { shape, func } from 'prop-types'
import { CssReset } from '@dhis2/ui-core'
import { HeaderBar } from '@dhis2/ui-widgets'
import { DataProvider } from '@dhis2/app-runtime'
import { Provider } from 'react-redux'
import { Routes } from '../Routes'
import { PageWrapper } from '../PageWrapper'
import { AuthWall } from '../AuthWall'

const { REACT_APP_DHIS2_BASE_URL } = process.env

const App = ({ store }) => (
    <Provider store={store}>
        <DataProvider baseUrl={REACT_APP_DHIS2_BASE_URL} apiVersion="">
            <CssReset />
            <HeaderBar appName="Scheduler" />
            <PageWrapper>
                <AuthWall>
                    <Routes />
                </AuthWall>
            </PageWrapper>
        </DataProvider>
    </Provider>
)

App.propTypes = {
    store: shape({
        dispatch: func.isRequired,
        getState: func.isRequired,
        subscribe: func.isRequired,
    }).isRequired,
}

export default App
