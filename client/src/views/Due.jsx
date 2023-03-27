import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField } from '@mui/material'
import axios from 'axios'
import { Stack } from '@mui/system'

const useStyles = styled({
    table: {
        minWidth: 250,
    },
})

function remainingDays(futureDateTime) {
    const oneDayMs = 24 * 60 * 60 * 1000
    const futureDateMs = new Date(futureDateTime).getTime()
    const currentDateMs = new Date().getTime()
    const differenceMs = futureDateMs - currentDateMs
    const remainingDays = Math.ceil(differenceMs / oneDayMs)
    return remainingDays
}

const Dues = () => {
    const classes = useStyles()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [books, setBooks] = useState([])
    const [search, setSearch] = useState('')
    const [filtered, setFiltered] = useState([])
    const [isClicked, setIsClicked] = useState(false)
    const userId = 1 // TODO get from local storage

    useEffect(() => {
        axios
            .get(`http://localhost:3001/user/borrowed/${userId}`)
            .then((response) => {
                setBooks(response.data)
                setFiltered(response.data)
                setIsClicked(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [isClicked])

    const handleReturnBook = async (book, userId) => {
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
            setIsClicked(true)
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
                            <TableCell>Due in</TableCell>
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
                                <TableCell>{remainingDays(book.returnDate)} Days</TableCell>
                                <TableCell>
                                    <Button variant='contained' color='primary' onClick={() => handleReturnBook(book, userId)}>
                                        Return
                                    </Button>
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

export default Dues
