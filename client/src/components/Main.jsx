import React from 'react'
import { Box } from '@mui/material'

const Main = ({ view }) => {
    return (
        <Box flex={11} sx={{ justifyContent: 'center', display: 'flex', marginTop: '60px', padding: '5px', overflow: 'hidden' }}>
            {view}
        </Box>
    )
}

export default Main
