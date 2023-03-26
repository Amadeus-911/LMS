import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    TablePagination,
    TextField,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import axios from 'axios'
import { Stack } from '@mui/system'

const useStyles = styled({
    table: {
        minWidth: 250,
    },
})

const Books = () => {
    const classes = useStyles()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [books, setBooks] = useState([])
    const [search, setSearch] = useState('')
    const [filtered, setFiltered] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)
    const userId = 1

    useEffect(() => {
        axios
            .get('http://localhost:3001/user/books')
            .then((response) => {
                setBooks(response.data)
                setFiltered(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const handleDeleteBook = (id) => {
        axios
            .delete(`http://localhost:3001/librarian/delete/${id}`)
            .then((response) => {
                // Make a new GET request to update the books state
                axios
                    .get('http://localhost:3001/user/books')
                    .then((response) => {
                        setBooks(response.data)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleBorrowBook = async (book, userId) => {
        const now = new Date() // get the current date-time value
        const twoWeeksFromNow = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000)
        try {
            const response = await axios.post('http://localhost:3001/user/borrow', {
                bookId: book.id,
                userId: userId,
                name: book.name,
                author: book.author,
                genre: book.genre,
                returnDate: twoWeeksFromNow,
            })
            console.log(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
        console.log(event.target.value)
        if (event.target.value === '') {
            setFiltered(books)
        } else {
            setFiltered(books.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())))
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    return (
        <Stack spacing={2} sx={{ width: { xs: '250px', sm: '700px' }, alignContent: 'center' }}>
            <TextField label={'Search'} variant='outlined' type='text' autoComplete='text' autoFocus value={search} onChange={handleSearchChange} />
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label='book table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Genre</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    {/* <TableBody>
                        {(rowsPerPage > 0 ? filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : filtered).map((book) => (
                            <TableRow key={book.id}>
                                <TableCell>{book.id}</TableCell>
                                <TableCell>{book.name}</TableCell>
                                <TableCell>{book.author}</TableCell>
                                <TableCell>{book.genre}</TableCell>
                                <TableCell>
                                    <IconButton>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteBook(book.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody> */}
                    <TableBody>
                        {(rowsPerPage > 0 ? filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : filtered).map((book) => (
                            <TableRow key={book.id}>
                                <TableCell>{book.id}</TableCell>
                                <TableCell>{book.name}</TableCell>
                                <TableCell>{book.author}</TableCell>
                                <TableCell>{book.genre}</TableCell>
                                <TableCell>
                                    {isAdmin ? (
                                        <>
                                            <IconButton>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDeleteBook(book.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </>
                                    ) : // <Button variant='contained' color='primary'>
                                    //     {/* {book.isBorrowed ? 'Return' : 'Borrow'} */}
                                    //     Borrow
                                    // </Button>
                                    book.inStock > 0 ? (
                                        <Button variant='contained' color='primary' onClick={() => handleBorrowBook(book, userId)}>
                                            Borrow
                                        </Button>
                                    ) : (
                                        <Button variant='contained' color='secondary'>
                                            Wish
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component='div'
                    count={books.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Stack>
    )
}

export default Books
