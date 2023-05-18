import React from 'react'
import Header from '../../components/header'
import HeroSection from '../../components/hero'
import PopularToday from '../../components/popular_today'

const Home = () => {
  return (
    <>
      <Header />
      <div className='lg:flex container mx-auto lg:flex-row gap-4 mt-3'>
        <main className='lg:w-[70%]'>
          <HeroSection />
          <PopularToday />
        </main>
        <aside className='hidden lg:block w-[30%] rounded-md'>
          test
        </aside>
      </div>
    </>
  )
}

export default Home