import React from 'react'
import Header from '../../components/header'
import HeroSection from '../../components/hero'
import PopularToday from '../../components/popular_today'
import WebtoonList from '../../components/webtoon_list'
import PopularWebtoon from '../../components/popular_webtoon'
import usePageTitle from '../../hooks/usePageTitle'
import ScrollToTopButton from '../../components/ScrollToTopButton'

const Home = () => {
  usePageTitle('ManwhaKi - Read Webtoons')

  return (
    <>
      <Header />
      <div className='lg:flex container mx-auto lg:flex-row gap-4 mt-3'>
        <ScrollToTopButton />
        <main className='lg:w-[70%]'>
          <HeroSection />
          <PopularToday />
          <WebtoonList />
        </main>
        <div className=' lg:block lg:w-[30%] rounded-md'>
          <PopularWebtoon />
        </div>
      </div>
    </>
  )
}

export default Home