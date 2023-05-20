import React, { useEffect, useState } from 'react'
import { fetchWebtoonLists } from '../../hooks/fetchWebtoonList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { Pagination, Autoplay} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const {fetchData, webtoonList} = fetchWebtoonLists()
  const [slicedWebtoonList, setSlicedWebtoonList] = useState([])

  const sortAndSliceWebtoonList = () => {
    const sortedList = webtoonList.sort((a, b) => b.title.localeCompare(a.title))
    const slicedList = sortedList.slice(0, 3)
    setSlicedWebtoonList(slicedList)
  }

  useEffect(() => {
    const handleFetchData = async () => {
      await fetchData()
    }

    handleFetchData()
  }, [])

  useEffect(() => {
    sortAndSliceWebtoonList()
  }, [webtoonList])

  const handleGetWebtoonInfo = (titleSlug, title) => {
    const data = {
      titleSlug,
      title
    }

    localStorage.setItem('webtoonInfo', JSON.stringify(data))
  }

  return (
    <section className='hero-section mb-3'>
      <div className='bg-bg-100 container mx-auto'>
        <Swiper
          modules={[Pagination, Autoplay]}
          autoplay ={true}
          spaceBetween={60}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className='pb-6'
        >
          {slicedWebtoonList.map((webtoon) => (
            <SwiperSlide key={webtoon.title}>
              <div className='px-4 py-3 flex justify-between gap-3 text-t-white'>
                <div className='w-[75%] sm:w-[70%]'>
                  <div className='flex mb-2'>
                    <div className='relative flex items-center justify-center mr-2'>
                      <span className='text-yellow-300 text-5xl xl:text-6xl'>
                        <FontAwesomeIcon icon={faStar} />
                      </span>
                      <span className='text-[12px] absolute text-bg-300 md:text-sm'>10</span>
                    </div>
                    <div>
                      <Link to={`/manga/${webtoon.slug}`}>
                        <h1 
                          onClick={() => handleGetWebtoonInfo(webtoon.slug, webtoon.title)}
                          className='font-medium text-ellipsis overflow-hidden whitespace-nowrap w-[198px] sm:w-full md:text-lg xl:text-xl transition-colors duration-300 hover:text-primary cursor-pointer'>
                            {webtoon.title}
                        </h1>
                      </Link>
                      <span className='text-yellow-300 text-[12px] md:text-sm lg:text-base'>MANHWA</span>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2 md:gap-4'>
                    <span className='genre text-[12px] text-ellipsis overflow-hidden whitespace-nowrap md:text-sm'>{Array.isArray(webtoon.genre) ? webtoon.genre.join(', ').replace(/,/g, ', ') : webtoon.genre}</span>
                    <div className='text-[12px] md:text-sm'>
                      <span>Summary</span>
                      <p className='text-ellipsis overflow-hidden whitespace-nowrap'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate blanditiis quas velit quaerat at qui exercitationem consectetur </p>
                    </div>
                    <div className='flex flex-col text-[12px] md:text-sm'>
                      <span>Status: On goin</span>
                      <span>Author: BlueDeep</span>
                    </div>
                  </div>
                </div>
                <div className='flex-none rounded-md w-[25%] sm:flex sm:justify-end overflow-hidden'>
                  <Link to={`/manga/${webtoon.slug}`}>
                    <img 
                      onClick={() => handleGetWebtoonInfo(webtoon.slug, webtoon.title)}
                      src={webtoon.coverURL} 
                      alt={webtoon.title} 
                      className='rounded md w-[90%] xl:w-[65%] transition-all duration-300 hover:scale-110 cursor-pointer'
                    />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper> 
      </div>
    </section>
  )
}

export default HeroSection