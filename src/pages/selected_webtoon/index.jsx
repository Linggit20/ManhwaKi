import React, { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom'
import Header from '../../components/header'
import PopularWebtoon from '../../components/popular_webtoon'
import WebtoonInfo from '../../components/selected_webtoon_info'
import axios from 'axios'
import usePageTitle from '../../hooks/usePageTitle'

const SelectedWebtoon = () => {
  let { titleSlug } = useParams()
  const storedData = JSON.parse(localStorage.getItem('webtoonInfo'))
  const webtoonSlug = storedData ? storedData.titleSlug : null
  const webtoonSlugTitle = storedData ? storedData.title : null
  const [loading, setLoading] = useState(true)
  const [chapters, setChapters] = useState([])
  const [firstChapter, setFirstChapter] = useState({})
  const [lastChapter, setLastChapter] = useState({})
  const [selectedWebtoon, setSelectedWebtoon] = useState({})
  usePageTitle(webtoonSlugTitle)

  const fetchSelectedWebtoon = async () => {
    const options = {
      method: 'GET',
      url: `https://manga-scrapper.p.rapidapi.com/webtoons/${webtoonSlug}`,
      params: {provider: 'asura'},
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
        'X-RapidAPI-Host': 'manga-scrapper.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setSelectedWebtoon(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchChapter = async () => {
    setLoading(true)
    const options = {
      method: 'GET',
      url: 'https://manga-scrapper.p.rapidapi.com/chapters/all',
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
      const sortedData = response.data.sort((a, b) => b.chapterNum - a.chapterNum)
      setChapters(sortedData)

      const lastChapterIndex  = sortedData.length > 0 ? sortedData[0] : null
      const firstChapterIndex = sortedData.length > 0 ? sortedData[sortedData.length - 1] : null
      setFirstChapter(firstChapterIndex )
      setLastChapter(lastChapterIndex)

    } catch (error) {
      console.error(error)

    } finally {
      setLoading(false)

    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchSelectedWebtoon()
      await fetchChapter()
    }
    fetchData()
  }, [webtoonSlug])


  return (
    <>
      <Header />
      <div className='lg:flex container mx-auto lg:flex-row gap-4 mt-3'>
        <main className='lg:w-[70%]'>
          <WebtoonInfo 
            selectedWebtoon={selectedWebtoon} 
            webtoonSlugTitle={webtoonSlugTitle} 
            chapters={chapters}
            firstChapter={firstChapter}
            lastChapter={lastChapter}
          />
        </main>
        <aside className='lg:block lg:w-[30%] rounded-md'>
          <PopularWebtoon />
        </aside>
      </div>
    </>
  )
}

export default SelectedWebtoon