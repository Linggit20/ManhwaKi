import React from 'react'
import Header from './components/header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} exact />
    </Routes>
  )
}

export default App