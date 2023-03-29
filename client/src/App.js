import * as React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import AddBook from './views/AddBook'
import Books from './views/Books'
import Dues from './views/Due'
import Home from './Home'
import Update from './views/Update'

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/add' element={<Home view={<AddBook />} />} />
                <Route path='/books' element={<Home view={<Books />} />} />
                <Route path='/due' element={<Home view={<Dues />} />} />
                <Route exact path='/update/:id' element={<Home view={<Update />} />} />
            </Routes>
        </Router>
    )
}

export default App
