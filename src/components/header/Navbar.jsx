import { faBars, faBookOpenReader } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import SearchForm from './SearchForm'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [navClass, setNavClass] = useState('hidden')
  const [searchWidth, setSearchWidth] = useState('w-10')

  const handleShowNav = () => {
    setNavClass(prevNavClass => 
      prevNavClass === 'hidden' ? 'block' : 'hidden'
    )
  }

  const searchExpand = () => {
    setSearchWidth(prevSearchWidth  => 
      prevSearchWidth === 'w-10' ? 'w-56' : 'w-10'
    )
  }

  return (
    <nav className='bg-primary '>
      <div className='container mx-auto px-2 py-3 flex items-center justify-between lg:hidden'>
        <div className='flex items-center'>
          <button type='button' className='text-2xl text-t-white px-2 focus:outline focus:outline-t-white rounded-md mr-2' onClick={handleShowNav}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <Link className='text-3xl text-t-white'>
            <FontAwesomeIcon icon={faBookOpenReader} />
          </Link>
        </div>
        <SearchForm searchExpand={searchExpand} searchWidth={searchWidth}/>
        <div className={`fixed container mx-auto top-0 h-full right-0 left-0 pt-16 ${navClass} bg-bg-300 z-20 bg-opacity-95`}>
          <ul className='flex flex-col mt-3 px-4 text-t-white'>
            <li>
              <Link to='/' className='p-3 rounded-md transition-colors duration-300 hover:bg-bg-100 block'>Home</Link>
            </li>
            <li>
              <Link className='p-3 rounded-md transition-colors duration-300 hover:bg-bg-100 block'>Bookmarks</Link>
            </li>
            <li>
              <Link className='p-3 rounded-md transition-colors duration-300 hover:bg-bg-100 block'>Comics</Link>
            </li>
          </ul>
          <button type='button' className='block w-[95%] mx-auto bg-primary rounded-md p-2 text-t-white'>
            Surprise Me!
          </button>
        </div>
      </div>
      <div className='container mx-auto hidden lg:block'>
        <div className='flex items-center justify-between text-t-white py-3'>
          <ul className='flex w-1/5 justify-between gap-3'>
            <li>
              <Link to='/' className='py-1 px-3 rounded-md transition-colors duration-300 hover:bg-bg-100'>Home</Link>
            </li>
            <li>
              <Link className='py-1 px-3 rounded-md transition-colors duration-300 hover:bg-bg-100'>Bookmarks</Link>
            </li>
            <li>
              <Link className='py-1 px-3 rounded-md transition-colors duration-300 hover:bg-bg-100'>Comics</Link>
            </li>
          </ul>
          <button type='button' className='bg-bg-100 py-1 px-3 text-sm rounded-md transition-colors duration-300 hover:bg-t-white hover:text-bg-100'>
            Surprise Me!
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar