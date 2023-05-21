import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import SelectedWebtoon from './pages/selected_webtoon'
import MainContent from './pages/main_content'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} exact />
      <Route path='manga'>
          <Route path=':titleSlug' element={<SelectedWebtoon />} />
      </Route>
      <Route path='/:chapterSlug' element={<MainContent />} />
    </Routes>
  )
}

export default App