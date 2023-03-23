import * as React from 'react'
import Box from '@mui/material/Box'
import { Stack } from '@mui/material'

import Main from './components/Main'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

export default function Home({ view }) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Navbar />
            <Stack direction={'row'}>
                <Sidebar />
                <Main view={view} />
            </Stack>
        </Box>
    )
}
