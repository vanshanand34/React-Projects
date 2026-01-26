import { Route, Routes } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

import { Home } from './pages/Home'
import { EditBook } from './pages/EditBook'
import { CreateBook } from './pages/CreateBook'
import { ShowBook } from './pages/ShowBook'

import './index.css'

function App() {

  return (
    <>
      <SnackbarProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/books/show/:id' element={<ShowBook />} />
          <Route path='/books/edit/:id' element={<EditBook />} />
          <Route path='/books/create' element={<CreateBook />} />
        </Routes>
      </SnackbarProvider>
    </>
  )
}

export default App
