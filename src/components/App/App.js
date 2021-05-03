import { useDataEngine } from '@dhis2/app-runtime'
import { QueryClient, QueryClientProvider } from 'react-query'
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

const App = () => {
    const engine = useDataEngine()
    const queryFn = ({ queryKey }) => {
        const [query] = queryKey
        return engine.query(query)
    }
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                queryFn,
            },
        },
    })

    return (
        <QueryClientProvider client={queryClient}>
            <CssVariables spacers colors theme />
            <PageWrapper>
                <AuthWall>
                    <Store>
                        <Routes />
                    </Store>
                </AuthWall>
            </PageWrapper>
        </QueryClientProvider>
    )
}

export default App
