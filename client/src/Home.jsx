import * as React from 'react'
import Box from '@mui/material/Box'
import { Stack } from '@mui/material'

import Main from './components/Main'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

export default function Home() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Navbar />
            <Stack direction={'row'}>
                <Sidebar />
                <Main />
            </Stack>
        </Box>
    )
}
