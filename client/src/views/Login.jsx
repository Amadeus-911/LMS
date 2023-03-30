import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Copyright(props) {
    return (
        <Typography variant='body2' color='text.secondary' align='center' {...props}>
            {'Copyright © '}
            <Link color='inherit' href='https://mui.com/'>
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

const theme = createTheme()

export default function SignIn() {
    const navigate = useNavigate()

    const login = async (body) => {
        try {
            const response = await axios.post(`http://localhost:3001/auth/login`, body)
            console.log(response.data)
            const token = response.data.token
            const parts = token.split('.')
            const encodedPayload = parts[1]
            const decodedPayload = atob(encodedPayload)
            const payloadObj = JSON.parse(decodedPayload)

            localStorage.setItem('userId', payloadObj.userId)
            localStorage.setItem('role', payloadObj.role)
            localStorage.setItem('email', payloadObj.email)
            localStorage.setItem('token', token)

            console.log(payloadObj)
            navigate('/books')
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const body = {
            email: data.get('email'),
            password: data.get('password'),
        }
        console.log()
        login(body)
    }

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        console.log(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        console.log(e.target.value)
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Sign in
                    </Typography>
                    <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='email'
                            label='Email Address'
                            name='email'
                            autoComplete='email'
                            value={email}
                            onChange={handleEmailChange}
                            autoFocus
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            value={password}
                            onChange={handlePasswordChange}
                            autoComplete='current-password'
                        />
                        {/* <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' /> */}
                        <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>
                    </Box>
                </Box>
                {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
            </Container>
        </ThemeProvider>
    )
}
