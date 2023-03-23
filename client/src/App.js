import * as React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import AddBook from './views/AddBook'
import Books from './views/Books'

import Home from './Home'

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/add' element={<Home view={<AddBook />} />} />
                <Route path='/books' element={<Home view={<Books />} />} />
                <Route path='/update' component={<Home />} />
            </Routes>
        </Router>
    )
}

export default App
