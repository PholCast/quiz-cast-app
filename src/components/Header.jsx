import React, { useState } from 'react'
import darkLogo from '/dark_mode.svg'
import lightLogo from '/light_mode.svg'

const Header = () => {
  const [darkTheme, setDarkTheme] = useState(false)

  const changeTheme = () => setDarkTheme(prev => !prev)

  return (
    <header className='w-full bg-blue-600 p-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-white text-2xl flex-1 text-center'>
          QuizCast App
        </h1>
        <div className="flex items-center">
          <img 
            className="cursor-pointer text-white"
            src={darkTheme ? darkLogo : lightLogo} 
            alt="Active theme mode" 
            onClick={changeTheme}
            aria-label="Toggle theme"
          />
        </div>
      </div>
    </header>
  )
}

export default Header
