import React from 'react'
import './App.css'
import {Container} from '@mui/material'
import Dashboard from './components/Dashboard'

function App() {
    return (
        <Container sx={{pt: 4, pb: 4}}>
          <Dashboard/>
        </Container>
    )
}

export default App
