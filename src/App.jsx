import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import SelectedWebtoon from './pages/selected_webtoon'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} exact />
      <Route path='manga'>
          <Route path=':titleSlug' element={<SelectedWebtoon />} />
      </Route>
    </Routes>
  )
}

export default App