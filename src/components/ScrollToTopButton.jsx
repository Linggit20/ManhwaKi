import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const screenHeight = window.innerHeight
      setIsVisible(scrollY > screenHeight * .5)
    }

    const handleScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsVisible(false)
  }

  return (
    <button
      className={`scroll-to-top z-10 bg-primary fixed bottom-16 right-4 h-8 w-8 rounded-full flex items-center justify-center text-t-white ${
        isVisible ? 'visible opacity-100' : 'invisible opacity-0'
      } transition-opacity duration-500`}
      onClick={handleScrollToTop}
    >
      <FontAwesomeIcon icon={faChevronUp} />
    </button>
  )
}

export default ScrollToTopButton
