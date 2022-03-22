import React from 'react'

import logo from '@image/logo.svg'

import './main.scss'

//Components
import { Stack } from '@components/main/'

function Main() {
  return (
    <div className='main'>
      <header className='header'>
        <img src={logo} className='logo' alt='logo' />
        <Stack text='Your development stack: React JS' />
      </header>
    </div>
  )
}

export default Main
