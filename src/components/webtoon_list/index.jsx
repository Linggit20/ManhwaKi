import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const WebtoonList = () => {
  const [webtoonList, setWebtoonList] = useState([])
  const [pageNum, setPageNum] = useState(1)
  const [slug, setSlug] = useState('')
  const manhwaListRef = useRef(null)

  const fetchWebtoonListPaginated = async () => {
    const options = {
      method: 'GET',
      url: 'https://manga-scrapper.p.rapidapi.com/webtoons',
      params: {
        provider: 'asura',
        page: pageNum,
        limit: '20'
      },
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
        'X-RapidAPI-Host': 'manga-scrapper.p.rapidapi.com'
      }
    }

    try {
      const response = await axios.request(options)
      setWebtoonList(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchWebtoonListPaginated()
    }

    fetchData()
  }, [pageNum])
  
  const scrollToManhwaList = () => {
    if (manhwaListRef.current) {
      manhwaListRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleNextPage = () => {
    scrollToManhwaList()

    const fetchData = async () => {
      setPageNum(currentPage => currentPage + 1)
      await fetchWebtoonListPaginated()
    }  
    setTimeout(() => {
      fetchData()
    }, 700)
  }

  const handlePrevPage = () => {
    scrollToManhwaList()

    const fetchData = async () => {
      setPageNum(currentPage => currentPage - 1)
      await fetchWebtoonListPaginated()
    }  
    setTimeout(() => {
      fetchData()
    }, 700)
  }

  return (
    <section ref={manhwaListRef} id='manhwa-list' className='popular-today-section text-t-white mb-3'>
      <div className='container mx-auto bg-bg-100 pb-3 rounded-md'>
        <div className='border-bg-200 border-b py-3 px-4'>
          <h1 className='font-bold'>Webtoon Lists</h1>
        </div>
        <div className='px-4 mb-3'>
          <div className=' grid md:grid-cols-2'>
            {webtoonList.map((webtoon, index) => (
              <div key={index} className='md:border-bg-200 md:border-b hover:opacity-100'>
                <div className='flex gap-3 border-b border-bg-200 py-4 md:border-none'>
                  <div className='flex-none w-[120px] h-[160px] overflow-hidden'>
                    <img
                      onClick={() => setSlug(webtoon.slug)}
                      src={webtoon.coverURL}
                      alt={webtoon.title}
                      className='w-full h-full rounded-md transition-all duration-300 hover:scale-110 cursor-pointer'
                    />
                  </div>
                  <div className='flex-1 relative'>
                    <h2
                      onClick={() => setSlug(webtoon.slug)}
                      className='transition0-color duration-300 hover:text-primary cursor-pointer mb-2'>
                        {webtoon.title}
                    </h2>
                    <span className='chapter text-[12px] lg:text-sm sm:min-w-[260px] sm:max-w-[260px] md:min-w-[230px] md:max-w-[230px] lg:min-w-[200px] lg:max-w-[200px] xl:min-w-[260px] xl:max-w-[260px] sm:block'>
                      Genre:
                      <span className='ml-1'>
                        {Array.isArray(webtoon.genre) ? (
                          webtoon.genre.join(', ').replace(/,/g, ', ').length > 30 ? (
                            `${webtoon.genre.slice(0, 5).join(', ')}...`
                          ) : (
                            webtoon.genre.join(', ').replace(/,/g, ', ')
                          )
                        ) : (
                          webtoon.genre
                        )}
                      </span>
                    </span>
                     <div className='text-[12px] lg:text-sm mt-1 absolute bottom-4'>
                        <span className='text-yellow-300'><FontAwesomeIcon icon={faStar} /></span>
                        <span className='text-yellow-300'><FontAwesomeIcon icon={faStar} /></span>
                        <span className='text-yellow-300'><FontAwesomeIcon icon={faStar} /></span>
                        <span className='text-yellow-300'><FontAwesomeIcon icon={faStar} /></span>
                        <span className='text-yellow-300 mr-2'><FontAwesomeIcon icon={faStar} /></span>
                      </div>
                  </div>
                </div> 
              </div>
            ))}
          </div>     
        </div>
        <div className='flex items-center justify-center text-sm text-t-white'>
          <button 
            onClick={handlePrevPage}
            className={`mr-3 px-4 py-1 bg-primary rounded-md transition-opacity duration-300 hover:bg-opacity-90 ${pageNum === 1 && 'hidden'}`}>Prev</button>
          <button
            onClick={handleNextPage}
            className={`px-4 py-1 bg-primary rounded-md transition-opacity duration-300 hover:bg-opacity-90 ${pageNum === 9 && 'hidden'}`}>Next</button>
        </div>  
      </div>
    </section>
  )
}

export default WebtoonList