import React from 'react'
import { AppBar } from '@mui/material'
import { Toolbar } from '@mui/material'

const Navbar = () => {
    return (
        <AppBar position='sticky' sx={{ width: '100%' }}>
            <Toolbar>Navbar</Toolbar>
        </AppBar>
    )
}

export default Navbar
