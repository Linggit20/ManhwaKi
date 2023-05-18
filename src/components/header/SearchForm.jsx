import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useRef, useState } from 'react'

const SearchForm = ({searchWidth, searchExpand}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null)
  
  const handleSearchExpand = () => {
    searchExpand()
    setIsFocused(!isFocused);
    if (!isFocused) {
      inputRef.current.focus();
    } else {
      inputRef.current.blur();
    }
  };

  return (
    <form className={`text-t-white flex items-center justify-center relative rounded-md h-10 transition-all duration-300 ${searchWidth}`}>
      <input ref={inputRef} type="text" className='w-full h-full rounded-md bg-bg-200 pl-4 lg:pr-10'/>
      <button type='button' className='absolute right-0 bg-bg-200 w-9 h-9 flex items-center justify-center rounded-md lg:cursor-default' onClick={handleSearchExpand}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  )
}

export default SearchForm