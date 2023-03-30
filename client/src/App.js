import * as React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import AddBook from './views/AddBook'
import Books from './views/Books'
import Dues from './views/Due'
import Home from './Home'
import Update from './views/Update'
import SignIn from './views/Login'

const role = localStorage.getItem('role')
const token = localStorage.getItem('token')

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<SignIn />} />
            </Routes>
            {token && (
                <Routes>
                    {role === 'admin' ? (
                        <>
                            <Route exact path='/update/:id' element={<Home view={<Update />} />} />
                            <Route path='/add' element={<Home view={<AddBook />} />} />
                            <Route path='/books' element={<Home view={<Books />} />} />
                        </>
                    ) : (
                        <>
                            <Route path='/books' element={<Home view={<Books />} />} />
                            <Route path='/due' element={<Home view={<Dues />} />} />
                        </>
                    )}
                </Routes>
            )}
        </Router>
    )
}

export default App
