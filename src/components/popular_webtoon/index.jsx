import React, { useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { fetchWebtoonLists } from '../../hooks/fetchWebtoonList'
import { Link } from 'react-router-dom'

const PopularWebtoon = () => {
  const {fetchData, webtoonList} = fetchWebtoonLists()
  const [slicedWebtoonList, setSlicedWebtoonList] = useState([])

  const sortAndSliceWebtoonList = () => {
    const sortedList = webtoonList.sort((a, b) => b.title.localeCompare(a.title))
    const slicedList = sortedList.slice(0, 10)
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
    <section className='popular-webtoons text-t-white bg-bg-100 mb-4 lg:bg-bg-200 rounded-md flex flex-col w-full'>
      <div className='px-4 py-2 mb-3 border-bg-200 lg:border-bg-100 border-b'>
        <h1 className='font-bold'>Popular</h1>
      </div>
      <div className='px-4'>
        <div className='grid grid-cols-3 gap-4 px-2 bg-bg-200 lg:bg-bg-100 py-2 text-sm rounded-md mb-3'>
          <button type='button' className='bg-primary rounded-md py-1 duration-300 transition-colors hover:bg-primary'>Weekly</button>
          <button type='button' className='rounded-md py-1 duration-300 transition-colors hover:bg-primary'>Monthly</button>
          <button type='button'className='rounded-md py-1 duration-300 transition-colors hover:bg-primary'>All</button>
        </div>
      </div>
      {slicedWebtoonList.map((webtoon, index) => (
        <div key={index} className='flex items-center mb-3 border-bg-200 lg:border-bg-100 border-b px-4 pb-3'>
          <span className='border px-2 text-[12px] rounded-sm  mr-3'>{index + 1}</span>
          <div className='self-start overflow-hidden w-[25%] sm:w-[15%] lg:w-[35%] xl:w-[26%]'>
            <Link to={`/manga/${webtoon.slug}`}>
              <img
                onClick={() => handleGetWebtoonInfo(webtoon.slug, webtoon.title)}
                src={webtoon.coverURL}
                alt={webtoon.title}
                className='rounded-md min-w-[90%] max-w-[90%] min-h-[110px] max-h-[110px] transition-all duration-300 hover:scale-110'
              />
            </Link>
          </div>
          <div className='self-start flex-1'>
            <Link to={`/manga/${webtoon.slug}`}>
              <h2
                onClick={() => handleGetWebtoonInfo(webtoon.slug, webtoon.title)}
                className='font-medium mb-1 transition-colors duration-300 hover:text-primary cursor-pointer'>
                  {webtoon.title}
              </h2>
            </Link>
            <span className='text-sm'><span className='opacity-70'>Genres: </span>
              {Array.isArray(webtoon.genre) ? (
                webtoon.genre.join(', ').replace(/,/g, ', ').length > 30 ? (
                  `${webtoon.genre.slice(0, 4).join(', ')}...`
                ) : (
                  webtoon.genre.join(', ').replace(/,/g, ', ')
                )
              ) : (
                webtoon.genre
              )}
            </span>
            <div className='text-sm'>
              <span className='text-yellow-300'><FontAwesomeIcon icon={faStar} /></span>
              <span className='text-yellow-300'><FontAwesomeIcon icon={faStar} /></span>
              <span className='text-yellow-300'><FontAwesomeIcon icon={faStar} /></span>
              <span className='text-yellow-300'><FontAwesomeIcon icon={faStar} /></span>
              <span className='text-yellow-300 mr-2'><FontAwesomeIcon icon={faStar} /></span>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

export default PopularWebtoon