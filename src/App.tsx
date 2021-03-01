import React from 'react'
import * as config from './config'

function App() {
  console.log(config.VERSION)
  console.log(process.env.NODE_ENV)

  return (
    <div className='bg-gray-800 text-white h-screen'>
      <p>
        Edit 1<code>src/App.tsx</code> and save to reload.
      </p>
      <a href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
        Learn React
      </a>
    </div>
  )
}

export default App
