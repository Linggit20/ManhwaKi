import React from 'react'
import { faBookOpenReader } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchForm from './SearchForm'
import Navbar from './Navbar'

const Header = () => {
  return (
    <header>
      <div className='container mx-auto text-t-white flex items-center justify-between py-2'>
        <a href="" className='text-3xl font-bold'>
          <span className='text-primary mr-2'>
            <FontAwesomeIcon icon={faBookOpenReader} />
          </span>
          ManhwaKi
        </a>
        <div className='w-1/5'>
          <SearchForm />
        </div>
      </div>
      <Navbar />
    </header>
  )
}

export default Header