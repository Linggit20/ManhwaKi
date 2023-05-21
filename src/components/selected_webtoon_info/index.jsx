import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faChevronRight, faStar } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const WebtoonInfo = ({selectedWebtoon, webtoonSlugTitle, chapters, firstChapter, lastChapter, handleGetWebtoonInfo}) => {
  const createdAt = new Date(selectedWebtoon.createdAt)
  const formattedCreatedAt = createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const updatedAt = new Date(selectedWebtoon.updatedAt)
  const formattedUpdatedAt = updatedAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })


  return (
    <>
      <div className='container mx-auto bg-bg-100 text-t-white px-4 py-2 mb-4 rounded-md'>
        <ol className='flex items-center gap-3 text-[12px] sm:text-sm'>
          <li>
            <Link to='/' className='transition-colors duration-300 hover:text-primary' >
              ManhwaKi
            </Link>
          </li>
          <span className='text-[10px]'>
            <FontAwesomeIcon icon={faChevronRight} />
          </span>
          <li>
            <Link to={`/manga/${selectedWebtoon.slug}`} className='transition-colors duration-300 hover:text-primary'>
              <span>
                {webtoonSlugTitle}
              </span>
            </Link>
          </li>
        </ol>
      </div>
      <section className='selected-webtoon-section'>
        <div className='container mx-auto bg-bg-100 text-t-white px-4 py-3 mb-4 rounded-md'>
          <div className='flex flex-col gap-8 md:flex-row'>
            <div className='flex flex-col items-center gap-3 text-sm '>
              <img src={selectedWebtoon.coverURL} alt={selectedWebtoon.title} className='min-w-[120px] max-w-[120px] rounded-md md:min-w-[180px] md:max-w-[180px] xl:min-w-[200px] xl:max-w-[200px]'/>
              <div className='bg-primary w-3/4 rounded-md py-2 text-center  md:w-full'>
                <span className='mr-1'>
                  <FontAwesomeIcon icon={faBookmark} />
                </span>
                Bookmark
              </div>
              <div className='flex flex-col w-full items-center gap-2'>
                <div className='bg-bg-200 w-3/4  flex items-start rounded-md py-2 text-center  px-4 md:w-full'>
                  <span className='text-yellow-300'><FontAwesomeIcon icon={faStar} /></span>
                  <span className='text-yellow-300'><FontAwesomeIcon icon={faStar} /></span>
                  <span className='text-yellow-300'><FontAwesomeIcon icon={faStar} /></span>
                  <span className='text-yellow-300'><FontAwesomeIcon icon={faStar} /></span>
                  <span className='text-yellow-300'><FontAwesomeIcon icon={faStar} /></span>
                </div>
                <div className='w-3/4 gap-3 flex justify-center rounded-md md:w-full  md:block'>
                  <span className='bg-bg-200 block w-full px-4 py-2 rounded-md md:mb-2'>
                    Status
                  </span>
                  <span className='bg-bg-200 block w-full px-4 py-2 rounded-md'>
                    Type
                  </span>
                </div>
              </div>
            </div>
            <div className='text-sm pb-2'>
              <h1 className='text-center font-bold text-xl mb-4 md:text-start'>{selectedWebtoon.title}</h1>
              <h2 className='mb-4'>Synopsis {selectedWebtoon.title}</h2>
              <p className='mb-4' dangerouslySetInnerHTML={{__html: selectedWebtoon.synopsis}}></p>
              <div>
                <div className='md:grid md:grid-cols-2 '>
                  <div className='mb-4'>
                    <b className='block mb-2'>Released</b>
                    <span>-</span>
                  </div>
                  <div className='mb-4'>
                    <b className='block mb-2'>Author</b>
                    <span>-</span>
                  </div>
                </div>
                <div className='md:grid md:grid-cols-2 md:mb-3'>
                  <div className='mb-4'>
                    <b className='block mb-2'>Posted On</b>
                      {formattedCreatedAt}
                  </div>
                  <div className='mb-4'>
                    <b className='block mb-2'>Updated On</b>
                    {formattedUpdatedAt}
                  </div>
                </div>
              </div>
              <div>
                <b className='block mb-2'>Genres</b>
              <div className='w-[90%]'>
                {selectedWebtoon.genre && Array.isArray(selectedWebtoon.genre) ? (
                  selectedWebtoon.genre.map((genre) => (
                    <span key={genre} className='mr-2 bg-bg-200 px-2 py-1 rounded-md inline-block mb-2'>{genre}</span>
                  ))
                ) : (
                  <span>No genres available</span>
                )}
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className='container mx-auto bg-bg-100 text-t-white py-2 mb-4 rounded-md '>
        <div className='px-4 py-2 mb-3 border-bg-200  border-b'>
          <h2 className='font-bold'>Chapter {selectedWebtoon.title}</h2>
        </div>
        <div>
          <div className='mx-auto flex w-[90%] items-center gap-4 justify-between mb-4'>
            <Link to={`/${firstChapter.slug}`} className='bg-primary text-center w-full rounded-md py-3 transition-opacity duration-300 hover:bg-opacity-90' onClick={() => {handleGetWebtoonInfo(firstChapter.slug)}}>
              <span className='text-[12px] md:text-sm'>First Chapter</span>
              <b className='block'>{`Chapter ${firstChapter.chapterNum}`}</b>
            </Link>
            <Link to={`/${lastChapter.slug}`} className='bg-primary text-center w-full rounded-md py-3 transition-opacity duration-300 hover:bg-opacity-90' onClick={() => {handleGetWebtoonInfo(lastChapter.slug)}}>
              <span className='text-[12px] md:text-sm'>New Chapter</span>
              <b className='block'>{`Chapter ${lastChapter.chapterNum}`}</b>
            </Link>
          </div>
          <div className='chapter-list max-h-[304px] min-h-[304px] w-[94%] mx-auto overflow-y-auto px-4'>
            <ul>
              {chapters.map((chapter, index) => (
                <li key={index}>
                  <Link to={`/${chapter.slug}`} className='border-bg-200 border rounded-md block py-3 px-4 mb-3 transition-colors duration-200 hover:bg-bg-200' onClick={() => {handleGetWebtoonInfo(chapter.slug)}}> 
                    Chapter {chapter.chapterNum}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default WebtoonInfo