import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const SearchForm = () => {
  return (
    <form  className='text-t-white relative flex items-center'>
      <input type="text" className='bg-bg-200 w-full pl-4 pr-8 py-1 rounded-md'/>
      <span className='absolute px-2 right-0'>
        <FontAwesomeIcon icon={faSearch} />
      </span>
    </form>
  )
}

export default SearchForm