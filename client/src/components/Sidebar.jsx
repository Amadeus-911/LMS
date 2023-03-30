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

const list = [
    { text: 'Profile', icon: <PersonIcon />, link: '/profile' },
    { text: 'Books', icon: <LibraryBooksIcon />, link: '/books' },
    { text: 'Add', icon: <AddToPhotosIcon />, link: '/add' },
    { text: 'Update', icon: <UpdateIcon />, link: '' },
    { text: 'Due', icon: <EventAvailableIcon />, link: '/due' },
]

const Item = ({ text, icon, link }) => {
    return (
        <ListItem disablePadding>
            <ListItemButton sx={{ paddingX: '20px' }} component={Link} to={link}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
            </ListItemButton>
        </ListItem>
    )
}

const Sidebar = () => {
    return (
        <Box bgcolor='lightblue' flex={2} p={2} sx={{ display: { xs: 'none', sm: 'block' }, height: '90vh' }}>
            <List>
                {list.map((item) => (
                    <Item text={item.text} icon={item.icon} link={item.link} />
                ))}
            </List>
        </Box>
    )
}

export default Sidebar
