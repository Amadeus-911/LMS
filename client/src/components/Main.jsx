import React from 'react'
import { Box } from '@mui/material'

import AddBook from '../views/AddBook'

const Main = () => {
    return (
        <Box flex={11} sx={{ justifyContent: 'center', display: 'flex', marginTop: '50px' }}>
            <AddBook />
        </Box>
    )
}

export default Main
