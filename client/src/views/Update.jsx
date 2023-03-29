import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
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
                    type={field.type}
                    autoComplete='text'
                    autoFocus
                    value={field.value}
                    onChange={field.onChange}
                />
            ))}
        </>
    )
}
const Update = () => {
    const { id } = useParams()
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [genre, setGenre] = useState('')
    const [stock, setStock] = useState(null)
    const [bookId, setBookId] = useState(null)

    useEffect(() => {
        console.log('jik')
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/user/book/${id}`)
                setName(response.data.name)
                setAuthor(response.data.author)
                setGenre(response.data.genre)
                setStock(response.data.inStock)
                setBookId(id)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    const handleBookIdChange = (event) => {
        setBookId(event.target.value)
    }

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    const handleGenreChange = (event, value) => {
        setGenre(value)
    }

    const handleStockChange = (event) => {
        setStock(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {
            name: name,
            author: author,
            genre: genre,
            inStock: stock,
        }

        try {
            const response = await axios.put('http://localhost:3001/librarian/update/' + bookId, {
                name: name,
                author: author,
                genre: genre,
                inStock: stock,
            })
            console.log(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    //TODO validate input

    const fields = [
        { label: 'ID', type: 'number', value: bookId, onChange: handleBookIdChange },
        { label: 'Name', type: 'text', value: name, onChange: handleNameChange },
        { label: 'Author', type: 'text', value: author, onChange: handleAuthorChange },
        { label: 'Stock', type: 'number', value: stock, onChange: handleStockChange },
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
                Update
            </Button>
        </Stack>
    )
}

export default Update
