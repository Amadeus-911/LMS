import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import {
    Box,
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
import { Link } from 'react-router-dom'

import Toast from '../components/Utilities'

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
    const [isClicked, setIsClicked] = useState(false)
    const [showToast, setShowToast] = useState(false)

    const [backendPage, setBackendPage] = useState(0)
    const [isMounted, setIsMounted] = useState(false)
    const [currBooks, setCurrBooks] = useState(0)
    const [totalBooks, setTotalBooks] = useState(0)

    const userId = localStorage.getItem('userId')
    console.log(userId)

    const role = localStorage.getItem('role')
    let isAdmin = false

    if (role === 'admin') {
        isAdmin = true
    } else {
        isAdmin = false
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/user/totalnum')
                setTotalBooks(response.data.totalBooks)
                if (response.data.totalBooks < 50) {
                    const response = await axios.get('http://localhost:3001/user/books')
                    setBooks(response.data)
                    setFiltered(response.data)
                    setCurrBooks(response.data.length)
                    setIsClicked(false)
                } else {
                    const response = await axios.get('http://localhost:3001/user/book')
                    setBooks(response.data.books)
                    setFiltered(response.data.books)
                    setBackendPage(response.data.currentPage)
                    setCurrBooks(response.data.books.length)
                    setIsClicked(false)
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [isClicked])

    const handleDeleteBook = (id) => {
        axios
            .delete(`http://localhost:3001/librarian/delete/${id}`)
            .then((response) => {
                // Make a new GET request to update the books state
                axios
                    .get('http://localhost:3001/user/books')
                    .then((response) => {
                        setBooks(response.data)
                        setIsClicked(true)
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
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            }, 2000)
            console.log(response.data)
            setIsClicked(true)
        } catch (error) {
            console.error(error)
        }
    }

    const handleSearchChange = (event) => {
        const { value } = event.target
        setSearch(value)
        setIsMounted(true)
    }

    useEffect(() => {
        // const filteredBooks = books.filter((book) => {
        //     const nameMatch = book.name.toLowerCase().includes(search.toLowerCase())
        //     const authorMatch = book.author.toLowerCase().includes(search.toLowerCase())
        //     const genreMatch = book.genre.toLowerCase().includes(search.toLowerCase())
        //     return nameMatch || authorMatch || genreMatch
        // })
        // setFiltered(filteredBooks)

        try {
            const fetchData = async () => {
                const response = await axios.get(`http://localhost:3001/user/search`, {
                    params: {
                        search: search,
                    },
                })
                console.log(response.data)
                setFiltered(response.data.filteredBooks)
                setPage(0)
            }
            if (isMounted) {
                fetchData()
                setIsMounted(false)
            }
        } catch (error) {
            console.log(error)
        }
    }, [search, isMounted])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
        console.log(rowsPerPage)
    }

    const handleLoadMoreBooks = async () => {
        try {
            console.log('hit')
            console.log(currBooks, totalBooks)
            if (currBooks < totalBooks) {
                let limit = 20
                if (currBooks + limit > totalBooks) {
                    limit = totalBooks - currBooks
                }
                const response = await axios.get(`http://localhost:3001/user/load`, {
                    params: {
                        page: backendPage + 1, // request next page of books
                        limit: limit, // request same number of rows per page
                    },
                })
                const newBooks = response.data.books
                setBooks([...books, ...newBooks])
                setFiltered([...books]) // append new books to the current list
                setCurrBooks(books.length)
                setBackendPage(response.data.page)
                setPage(page + 1) // update current page
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Box style={{ position: 'relative' }}>
            <Stack spacing={2} sx={{ width: { xs: '250px', sm: '700px' }, alignContent: 'center' }}>
                <TextField
                    label={'Search'}
                    variant='outlined'
                    type='text'
                    autoComplete='text'
                    autoFocus
                    value={search}
                    onChange={handleSearchChange}
                />
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
                                                <IconButton component={Link} to={`/update/${book.id}`}>
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
                        count={filtered.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
                <Button variant='outlined' onClick={handleLoadMoreBooks}>
                    Load More
                </Button>
                {showToast && <Toast severity={'success'} msg='Book Borrowed Successfully' />}
            </Stack>
        </Box>
    )
}

export default Books
