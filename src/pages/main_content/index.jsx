import React, { useEffect, useState } from 'react'
import { Link,  useParams } from 'react-router-dom'
import Header from '../../components/header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import usePageTitle from '../../hooks/usePageTitle'
import ScrollToTopButton from '../../components/ScrollToTopButton'

const MainContent = () => {
  let { chapterSlug } = useParams()
  const storedData = JSON.parse(localStorage.getItem('webtoonInfo'))
  const webtoonSlug = storedData ? storedData.titleSlug : null
  const webtoonSlugTitle = storedData ? storedData.title : null
  const storedDataChapter = JSON.parse(localStorage.getItem('chapterSlug'))
  const selectedChapter = storedDataChapter ? storedDataChapter.selectedChapterSlug : null
  const [content, setContent]  = useState({})
  const formattedChapter = selectedChapter.replace(/-/g, " ")
  usePageTitle(webtoonSlugTitle)

  const fetchWebtoonChapter = async () => {
    const options = {
      method: 'GET',
      url: `https://manga-scrapper.p.rapidapi.com/chapters/${selectedChapter}`,
      params: {
        provider: 'asura',
        webtoon: webtoonSlug
      },
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
        'X-RapidAPI-Host': 'manga-scrapper.p.rapidapi.com'
      }
    }

    try {
      const response = await axios.request(options)
      setContent(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchWebtoonChapter()

  }, [selectedChapter, webtoonSlug])

  const handleGetWebtoonInfo = (selectedChapterSlug) => {
    const data = {
      selectedChapterSlug,
    }

    localStorage.setItem('chapterSlug', JSON.stringify(data))
  }
  
  const handlePrevPage = () => {
    if (content.chapterNav !== null) {
      handleGetWebtoonInfo(content.chapterNav.prevSlug);
      
    }
  }

  const handleNextPage = () => {
    if (content.chapterNav !== null) {
      handleGetWebtoonInfo(content.chapterNav.nextSlug);
    
    }
  }
  
  return (
    <>
      <Header/>
      <main>
        <ScrollToTopButton />
        <section className='webton-content'>
          <div className='container mx-auto text-t-white mt-3 py-4'>
            <div className='px-4'>
              <div className='mb-4'>
                <h1 className='text-center font-semibold text-2xl mb-2 capitalize'>{formattedChapter}</h1>
                <h2 className='text-sm text-center'>All chapters are in <Link to={`/manga/${webtoonSlug}`} className='text-primary capitalize transition-opacity duration-300 hover:opacity-80'>{formattedChapter}</Link></h2>
              </div>
              <div className='bg-bg-100 text-t-white px-4 py-2 mb-4 rounded-md'>
                <ol className='flex items-center justify-center flex-wrap gap-3 text-[12px] sm:text-sm'>
                  <li>
                    <Link to='/' className='transition-colors duration-300 hover:text-primary'>
                      ManhwaKi
                    </Link>
                  </li>
                  <span className='text-[10px]'>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </span>
                  <li>
                    <Link to={`/manga/${webtoonSlug}`} className='transition-colors duration-300 hover:text-primary'>
                      <span>
                        {webtoonSlugTitle}
                      </span>
                    </Link>
                  </li>
                  <span className='text-[10px]'>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </span>
                  <li>
                    <Link to={`/${content.slug}`} className='transition-colors duration-300 hover:text-primary'>
                      <span className='capitalize'>
                        {formattedChapter}
                      </span>
                    </Link>
                  </li>
                </ol>
              </div>
              <p className='text-center text-sm mb-4'>
                Read the latest manga <b className='capitalize'>{formattedChapter}</b> at <b>ManhwaKi</b> . Manga <b>{webtoonSlugTitle} </b> is always updated at <b>ManwhaKi</b> . Don't forget to read the other manga updates. A list of manga collections ManhwaKi is in the Manga List menu.
              </p>
              <div className='md:flex md:justify-between md:items-center mb-6 text-sm'>
                <button className='block bg-primary w-full py-1 rounded-full px-3 mb-2 md:inline-block md:w-auto'>Chpater Test</button>
                <div className='flex justify-end gap-3'>
                  <Link
                    onClick={handlePrevPage} 
                    className={`py-1 px-4 bg-primary rounded-full ${content.chapterNav?.prevSlug === '' ? 'pointer-events-none bg-opacity-40' : '' }`}>
                      Prev
                  </Link>
                  <Link
                    onClick={handleNextPage}
                    className={`py-1 px-4 bg-primary rounded-full ${content.chapterNav?.nextSlug === '' ? 'pointer-events-none bg-opacity-40' : '' }`}>
                      Next
                  </Link>
                </div>
              </div>
            </div>
            <div>
              {content.contentURL && Array.isArray(content.contentURL) ? (
                content.contentURL.map((url, index) => (
                  <img key={index} src={url} alt={webtoonSlug} className='block mx-auto'/>
                ))
              ) : (
                <div className='h-40 w-full items-center justify-center flex text-xl font-bold capitalize text-center'>{formattedChapter} unavailable</div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default MainContent