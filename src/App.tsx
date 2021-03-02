import React, { useState, useEffect } from 'react'
import * as config from './config'
import { getCookie, createInit, getData } from './lib/init'

function App() {
  const [init, setInit] = useState({})
  const [initStatus, setInitStatus] = useState('init') // init, loading, loaded, error

  useEffect(() => {
    consolTitle()
    setInitStatus('loading')
    getData(
      `${config.PREFIX + config.URL_INIT}?session=${getCookie('session')}`
    )
      .then((data) => {
        const result: object = createInit(data)
        setInit(result)
      })
      .catch((e) => {
        setInitStatus('error')
      })
  }, [])

  function consolTitle(): void {
    console.group('Init player:')
    console.info(config.VERSION)
    config.DEBUG && console.log('env : ' + process.env.NODE_ENV)
    config.DEBUG && console.log('session : %s', getCookie('session'))
    console.groupEnd()
  }

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
