import React from 'react'
import './css/banner.css'

interface Props {
  banner: string | null | undefined
  genres: string[] | undefined
}

const Banner = (props: Props): React.ReactElement => {
  return (
    <>
      <aside>
        <iframe
          title='Coffee PWA'
          src={
            './adv_frame.html?' +
            props.banner +
            '&genre=' +
            props.genres?.join()
          }
          id='bannerRefresh'
        ></iframe>
      </aside>
    </>
  )
}

export default Banner
