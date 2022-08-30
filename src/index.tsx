import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import ThemeWrapper from './components/ThemeWrapper'
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

const client = new ApolloClient({
    uri: 'https://qlnm8wqrqj.sse.codesandbox.io/graphql',
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    ships: {
                        // Don't cache separate results based on
                        // any of this field's arguments.
                        keyArgs: false,

                        // Concatenate the incoming list items with
                        // the existing list items.
                        merge(existing = [], incoming) {
                            return [...existing, ...incoming];
                        },
                    }
                }
            }
        }
    })
});

root.render(
    <React.StrictMode>
        <ThemeWrapper>
            <ApolloProvider client={client}>
                <App/>
            </ApolloProvider>
        </ThemeWrapper>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
