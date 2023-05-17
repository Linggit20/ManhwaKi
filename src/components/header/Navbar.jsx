import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-primary'>
      <div className='container mx-auto flex justify-between'>
        <ul className='flex w-1/5 justify-between text-t-white h-12 items-center gap-3'>
          <li>
            <a href="" className='px-4 py-2 transition-all duration-200 hover:bg-bg-200 rounded-md'>Home</a>
          </li>
          <li>
            <a href="" className='px-4 py-2 transition-all duration-200 hover:bg-bg-200 rounded-md'>Bookmarks</a>
          </li>
          <li>
            <a href="" className='px-4 py-2 transition-all duration-200 hover:bg-bg-200 rounded-md'>Comics</a>
          </li>
        </ul>
        <button type='button' className='text-t-white transition-all h-8 px-2 duration-200 bg-bg-200 hover:bg-t-white hover:text-bg-300 rounded-md text-sm my-auto'>
          Surprise Me!
        </button>
      </div>
    </nav>
  )
}

export default Navbar