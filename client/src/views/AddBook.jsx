import React, { useState } from 'react'
import { Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { TextField } from '@mui/material'
import { Autocomplete, Button } from '@mui/material'
import axios from 'axios'

const Form = ({ fields }) => {
    return (
        <>
            {fields.map((field) => (
                <TextField
                    label={field.label}
                    required
                    variant='outlined'
                    type='text'
                    autoComplete='text'
                    autoFocus
                    value={field.value}
                    onChange={field.onChange}
                />
            ))}
        </>
    )
}
const AddBook = () => {
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [genre, setGenre] = useState('')

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    const handleGenreChange = (event, value) => {
        setGenre(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {
            name: name,
            author: author,
            genre: genre,
        }

        try {
            const response = await axios.post('http://localhost:3001/librarian/add', data)
            console.log(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    //TODO validate input

    const fields = [
        { label: 'Name', value: name, onChange: handleNameChange },
        { label: 'Author', value: author, onChange: handleAuthorChange },
    ]
    const genres = ['Fiction', 'Non-Fiction', 'Novel']

    return (
        <Stack spacing={1} sx={{ width: { xs: '250px', sm: '400px' } }}>
            <Form fields={fields} />
            <Autocomplete
                disablePortal
                id='combo-box-demo'
                options={genres}
                onChange={handleGenreChange}
                renderInput={(params) => <TextField {...params} required type={'text'} label='Genre' value={genre} />}
            />
            <Button onClick={handleSubmit} variant='contained' startIcon={<AddIcon />}>
                Add
            </Button>
        </Stack>
    )
}

export default AddBook
