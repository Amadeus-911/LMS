import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Stack, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { TextField } from '@mui/material'
import { Autocomplete, Button } from '@mui/material'
import axios from 'axios'
import Toast from '../components/Utilities'

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
const AddUser = () => {
    const { id } = useParams()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState(null)
    const [bookId, setBookId] = useState(null)

    const [showToast, setShowToast] = useState(false)

    // useEffect(() => {
    //     console.log('jik')
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:3001/user/book/${id}`)
    //             setName(response.data.name)
    //             setEmail(response.data.email)
    //             setRole(response.data.genre)
    //             setPassword(response.data.inPassword)
    //             setBookId(id)
    //             console.log(response.data)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     fetchData()
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    const handleBookIdChange = (event) => {
        setBookId(event.target.value)
    }

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handleRoleChange = (event, value) => {
        setRole(value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await axios.post('http://localhost:3001/auth/', {
                name: name,
                email: email,
                role: role,
                password: password,
            })
            console.log(response.data)
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            }, 2000)
        } catch (error) {
            console.error(error)
        }
    }

    //TODO validate input

    const fields = [
        { label: 'Name', type: 'text', value: name, onChange: handleNameChange },
        { label: 'Email', type: 'text', value: email, onChange: handleEmailChange },
        { label: 'Password', type: 'text', value: password, onChange: handlePasswordChange },
    ]
    const roles = ['student', 'teacher', 'admin']

    return (
        <Box style={{ position: 'relative' }}>
            <Stack spacing={1} sx={{ width: { xs: '250px', sm: '400px' } }}>
                <Form fields={fields} />
                <Autocomplete
                    disablePortal
                    id='combo-box-demo'
                    options={roles}
                    onChange={handleRoleChange}
                    renderInput={(params) => <TextField {...params} required type={'text'} label='Role' value={role} />}
                />
                <Button onClick={handleSubmit} variant='contained' startIcon={<AddIcon />}>
                    Add
                </Button>
                {showToast && <Toast severity={'success'} msg='User Added Successfully' />}
            </Stack>
        </Box>
    )
}

export default AddUser
