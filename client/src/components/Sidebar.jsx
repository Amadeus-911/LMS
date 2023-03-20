import React from 'react'
import { Box, Typography } from '@mui/material'

const Sidebar = () => {
    return (
        <Box bgcolor='blue' flex={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Typography>sidebar</Typography>
        </Box>
    )
}

export default Sidebar
