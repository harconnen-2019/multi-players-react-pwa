import React from 'react'
import './css/banner.css'

interface Props {
  banner: string | null | undefined
}

const Banner = (props: Props): React.ReactElement => {
  return (
    <>
      <aside>
        <iframe
          title='Coffee PWA'
          src={
            './adv_frame.html?' + props.banner
            //TODO: '&genre=' + this.props.playerStore.genre.join()
          }
          id='bannerRefresh'
        ></iframe>
      </aside>
    </>
  )
}

export default Banner
