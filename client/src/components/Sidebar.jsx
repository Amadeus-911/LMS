import React from 'react'
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

const list = {
    Profile: <PersonIcon />,
    Books: <LibraryBooksIcon />,
    Add: <AddToPhotosIcon />,
    Update: <UpdateIcon />,
    Due: <EventAvailableIcon />,
}

const Item = ({ text, icon }) => {
    return (
        <ListItem disablePadding>
            <ListItemButton sx={{ paddingX: '20px' }}>
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
                {Object.entries(list).map(([text, icon]) => (
                    <Item text={text} icon={icon} />
                ))}
            </List>
        </Box>
    )
}

export default Sidebar
