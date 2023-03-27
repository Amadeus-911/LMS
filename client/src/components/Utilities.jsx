import React from 'react'
import { Alert } from '@mui/material'

const Toast = ({ severity, msg }) => {
    return (
        <Alert severity={severity} color='info' sx={{ textAlign: 'center' }} style={{ position: 'fixed', bottom: '70px', right: '20px' }}>
            {msg}
        </Alert>
    )
}

export default Toast
