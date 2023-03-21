import React, { useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'
import { Box, Paper } from '@mui/material'

const books = [
    { id: 1, name: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction' },
    { id: 2, name: '1984', author: 'George Orwell', genre: 'Dystopian' },
    { id: 3, name: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction' },
    { id: 4, name: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance' },
    { id: 5, name: 'Animal Farm', author: 'George Orwell', genre: 'Dystopian' },
]

const SearchBox = styled(Box)({
    display: 'flex',
    minWidth: 400,
    margin: 'auto',
})

const SearchField = styled(TextField)({
    width: '100%',
})

const SearchInp = () => {
    const [searchValue, setSearchValue] = useState('')

    const handleInputChange = (event, value) => {
        setSearchValue(value)
    }

    const filteredBooks = books.filter(
        (book) =>
            book.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            book.author.toLowerCase().includes(searchValue.toLowerCase()) ||
            book.genre.toLowerCase().includes(searchValue.toLowerCase())
    )

    return (
        <SearchBox>
            <Autocomplete
                sx={{ minWidth: '400px' }}
                disablePortal
                id='search-box'
                options={filteredBooks}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <SearchField {...params} label='Search for a book' variant='outlined' onChange={handleInputChange} />}
                renderOption={(props, option) => {
                    return (
                        <Paper {...props} sx={{ p: 2 }}>
                            <div>{option.name}</div>
                            <div>{option.author}</div>
                            <div>{option.genre}</div>
                        </Paper>
                    )
                }}
            />
        </SearchBox>
    )
}

export default SearchInp
