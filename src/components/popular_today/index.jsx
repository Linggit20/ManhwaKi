import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { fetchWebtoonLists } from '../../hooks/fetchWebtoonList'

const PopularToday = () => {
  const {fetchData, webtoonList} = fetchWebtoonLists()
  const [slicedWebtoonList, setSlicedWebtoonList] = useState([])

  const handleSliceWebtoonList = () => {
    const slicedList = webtoonList.slice(0, 6)
    setSlicedWebtoonList(slicedList)
  }

  useEffect(() => {
    const handleFetchData = async () => {
      await fetchData()
    }

    handleFetchData()
  }, [])

  useEffect(() => {
    handleSliceWebtoonList()
  }, [webtoonList])

  return (
    <section className='popular-today-section text-t-white mb-3'>
      <div className='contaienr mx-auto bg-bg-100 pb-3 rounded-md'>
        <div className='border-bg-200 border-b py-3 px-4 mb-4'>
          <h1 className='font-bold'>Popular Today</h1>
        </div>
        <div className='px-4 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 text-t-white'>
          {slicedWebtoonList.map((webtoon) => (
            <div key={webtoon.title} className='mx-auto w-[90%] sm:w-[70%] md:w-[90%] mb-4 xl:mb-0 hover:opacity-100 group'>
              <div className='rounded-md mb-1 overflow-hidden'>
                <img src={webtoon.coverURL} alt="" className='rounded-md w-full cursor-pointer min-h-[243px] max-h-[243px] md:min-h-[266px] md:max-h-[266px] xl:min-h-[213px] xl:max-h-[213px] transition-all duration-300 group-hover:scale-110'/>
              </div>
              <h2 className='font-medium text-sm mb-1 text-ellipsis overflow-hidden whitespace-nowrap lg:text-base transition-colors duration-300 group-hover:text-primary cursor-pointer'>{webtoon.title}</h2>
              <span className='chapter text-[12px] lg:text-sm'>
                Genre:
                <span className='ml-1'>
                  {Array.isArray(webtoon.genre) ? (
                    webtoon.genre.join(', ').replace(/,/g, ', ').length > 30 ? (
                      `${webtoon.genre.slice(0, 1).join(', ')}...`
                    ) : (
                      webtoon.genre.join(', ').replace(/,/g, ', ')
                    )
                  ) : (
                    webtoon.genre
                  )}
                </span>
              </span>
              <div className='text-[12px] lg:text-sm mt-1'>
                <span className='text-yellow-300'><FontAwesomeIcon icon={faStar} /></span>
                <span className='text-yellow-300'><FontAwesomeIcon icon={faStar} /></span>
                <span className='text-yellow-300'><FontAwesomeIcon icon={faStar} /></span>
                <span className='text-yellow-300'><FontAwesomeIcon icon={faStar} /></span>
                <span className='text-yellow-300 mr-2'><FontAwesomeIcon icon={faStar} /></span>
              </div>
          </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PopularToday