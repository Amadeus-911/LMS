import React from 'react'
import { Box } from '@mui/material'

import AddBook from '../views/AddBook'
import Books from '../views/Books'
import SearchInp from './SearchBox'

const Main = () => {
    return (
        <Box flex={11} sx={{ justifyContent: 'center', display: 'flex', marginTop: '60px', padding: '5px', overflow: 'hidden' }}>
            <Books />
        </Box>
    )
}

export default Main
