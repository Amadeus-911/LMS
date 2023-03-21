import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TablePagination } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import axios from 'axios'

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

    useEffect(() => {
        axios
            .get('http://localhost:3001/user/books')
            .then((response) => {
                setBooks(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const handleDeleteBook = (id) => {
        axios
            .delete(`http://localhost:3001/librarian/books/${id}`)
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    return (
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
                    {(rowsPerPage > 0 ? books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : books).map((book) => (
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
    )
}

export default Books
