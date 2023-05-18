import { faBars, faBookOpenReader } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import SearchForm from './SearchForm'
import Navbar from './Navbar'

const Header = () => {
  return (
    <header>
      <div className='container mx-auto z-50'>
        <div className='hidden lg:block'>
          <div  className='flex items-cneter justify-between h-full py-3'>
            <Link className='text-3xl font-bold text-t-white'>
              <span className='text-primary mr-2'>
                <FontAwesomeIcon icon={faBookOpenReader} />
              </span>
              ManwhaKi
            </Link>
            <SearchForm />
          </div>
        </div>
      </div>
      <Navbar />
    </header>
  )
}

export default Header