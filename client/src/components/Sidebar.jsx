import React from 'react'
import { Link } from 'react-router-dom'
import { Box, ListItemText } from '@mui/material'
import { List } from '@mui/material'
import { ListItem } from '@mui/material'
import { ListItemIcon } from '@mui/material'
import { ListItemButton } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import UpdateIcon from '@mui/icons-material/Update'
import { useLocation } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { grey } from '@mui/material/colors'

const role = localStorage.getItem('role')
let list = []

if (role === 'admin') {
    list = [
        { text: 'Profile', icon: <PersonIcon />, link: '/profile' },
        { text: 'Books', icon: <LibraryBooksIcon />, link: '/books' },
        { text: 'Add', icon: <AddToPhotosIcon />, link: '/add' },
        { text: 'Update', icon: <UpdateIcon />, link: '' },
        // { text: 'Due', icon: <EventAvailableIcon />, link: '/due' },
    ]
} else {
    list = [
        { text: 'Profile', icon: <PersonIcon />, link: '/profile' },
        { text: 'Books', icon: <LibraryBooksIcon />, link: '/books' },
        // { text: 'Add', icon: <AddToPhotosIcon />, link: '/add' },
        // { text: 'Update', icon: <UpdateIcon />, link: '' },
        { text: 'Due', icon: <EventAvailableIcon />, link: '/due' },
    ]
}

const Item = ({ text, icon, link }) => {
    const { pathname } = useLocation()

    // Check if the current URL matches the link of the button
    const isActive = link === pathname
    let ListItemBut = null
    if (isActive) {
        ListItemBut = styled(ListItemButton)({
            backgroundColor: 'grey',
        })
    } else {
        ListItemBut = styled(ListItemButton)({})
    }

    return (
        <ListItem disablePadding>
            <ListItemBut sx={{ paddingX: '20px' }} component={Link} to={link}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
            </ListItemBut>
        </ListItem>
    )
}

const Sidebar = () => {
    return (
        <Box bgcolor='lightblue' flex={2} p={2} sx={{ display: { xs: 'none', sm: 'block' }, height: '100vh' }}>
            <List>
                {list.map((item) => (
                    <Item text={item.text} icon={item.icon} link={item.link} />
                ))}
            </List>
        </Box>
    )
}

export default Sidebar
