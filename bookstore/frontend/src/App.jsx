import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { Route, Routes } from 'react-router-dom'

import { Home } from './pages/Home'
import { EditBook } from './pages/EditBook'
import { DeleteBook } from './pages/DeleteBook'
import { CreateBook } from './pages/CreateBook'
import { ShowBook } from './pages/ShowBook'

import './index.css'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/books/show/:id' element={<ShowBook />} />
        <Route path='/books/edit/:id' element={<EditBook />} />
        <Route path='/books/delete/:id' element={<DeleteBook />} />
        <Route path='/books/create' element={<CreateBook />} />
      </Routes>
    </>
  )
}

export default App
