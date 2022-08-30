import React, {ReactNode} from 'react';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material'
import {red} from '@mui/material/colors'

interface IProps {
    children: ReactNode
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
    },
})

const ThemeWrapper = (props: IProps) => {
    const {children} = props

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    )
}

export default ThemeWrapper