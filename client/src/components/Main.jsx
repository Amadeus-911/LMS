import React from 'react'
import { Box, Autocomplete, Button } from '@mui/material'
import { TextField } from '@mui/material'
import { Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const fields = [{ label: 'Name' }, { label: 'Author' }]
const genres = ['Fiction', 'Non-Fiction', 'Novel']

const Form = ({ fields }) => {
    return (
        <>
            {fields.map((field) => (
                <TextField label={field.label} required variant='outlined' type='text' autoComplete='text' autoFocus />
            ))}
        </>
    )
}

const Main = () => {
    return (
        <Box flex={11} sx={{ justifyContent: 'center', display: 'flex', marginTop: '50px' }}>
            <Stack spacing={1} sx={{ width: { xs: '250px', sm: '400px' } }}>
                <Form fields={fields} />
                <Autocomplete
                    disablePortal
                    id='combo-box-demo'
                    options={genres}
                    renderInput={(params) => <TextField {...params} required type={'text'} label='Genre' />}
                />
                <Button variant='contained' startIcon={<AddIcon />}>
                    Add
                </Button>
            </Stack>
        </Box>
    )
}

export default Main
