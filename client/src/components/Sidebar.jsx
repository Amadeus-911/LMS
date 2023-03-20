import React from 'react'
import { Box, ListItemText, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { List } from '@mui/material'
import { ListItem } from '@mui/material'
import { ListItemIcon } from '@mui/material'
import { ListItemButton } from '@mui/material'
import InboxIcon from '@mui/icons-material/Inbox'
import PersonIcon from '@mui/icons-material/Person'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import AddIcon from '@mui/icons-material/Add'

const list = {
    Profile: <PersonIcon />,
    Books: <LibraryBooksIcon />,
    Add: <AddToPhotosIcon />,
    Due: <EventAvailableIcon />,
}

const Item = ({ text, icon }) => {
    return (
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
            </ListItemButton>
        </ListItem>
    )
}

const Sidebar = () => {
    return (
        <Box bgcolor='lightblue' flex={2} sx={{ display: { xs: 'none', sm: 'block' }, height: '100%' }}>
            <List>
                {Object.entries(list).map(([text, icon]) => (
                    <Item text={text} icon={icon} />
                ))}
            </List>
        </Box>
    )
}

export default Sidebar
