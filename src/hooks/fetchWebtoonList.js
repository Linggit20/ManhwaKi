import axios from 'axios'
import { useState } from 'react'

export const fetchWebtoonLists = () => {
  const [webtoonList, setWebtoonList] = useState([])
  const [isLoading, setLoading] = useState(true)

  const options = {
    method: 'GET',
    url: 'https://manga-scrapper.p.rapidapi.com/webtoons/all',
    params: { provider: 'asura' },
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
      'X-RapidAPI-Host': 'manga-scrapper.p.rapidapi.com'
    }
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const cachedWebtoonList = localStorage.getItem('webtoonList')
      const cachedTimestamp = localStorage.getItem('webtoonListTimestamp')
      if (cachedWebtoonList && cachedTimestamp) {
        const expirationTime = new Date(cachedTimestamp).getTime() + 24 * 60 * 60 * 1000
        if (new Date().getTime() < expirationTime) {
          setWebtoonList(JSON.parse(cachedWebtoonList))
          setLoading(false)
          return
        }
      }

      const response = await axios.request(options)
      setWebtoonList(response.data)
      localStorage.setItem('webtoonList', JSON.stringify(response.data))
      localStorage.setItem('webtoonListTimestamp', new Date().toString())
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return { fetchData, webtoonList, isLoading }
}