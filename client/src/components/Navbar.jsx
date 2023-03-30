// import React from 'react'
// import { AppBar, Button } from '@mui/material'
// import { Toolbar } from '@mui/material'

// const Navbar = () => {
//     return (
//         <AppBar position='sticky' sx={{ width: '100%' }}>
//             <Toolbar>My Library</Toolbar>
//             <Button variant='contained' sx={{ width: '50px' }}>
//                 Login
//             </Button>
//         </AppBar>
//     )
// }

// export default Navbar
import React, { useEffect, useState } from 'react'
import { AppBar, Button, Toolbar } from '@mui/material'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const token = localStorage.getItem('token')

const Navbar = () => {
    const [token, setToken] = useState(null)
    const [isClicked, setIsClicked] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        setToken(localStorage.getItem('token'))
    }, [isClicked])

    const handleLogout = async () => {
        try {
            localStorage.clear()
            setIsClicked(true)
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AppBar position='sticky' sx={{ width: '100%' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>My Library</div>
                {!token && (
                    <Button variant='outlined' sx={{ ml: 'auto', color: 'white' }} component={Link} to={'/login'}>
                        Login
                    </Button>
                )}
                {token && (
                    <Button variant='outlined' sx={{ ml: 'auto', color: 'white' }} onClick={handleLogout}>
                        Logout
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
