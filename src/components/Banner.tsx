import React from 'react'

import styles from './Banner.module.css'

interface Props {
  banner: string | null | undefined
  genres: string[] | undefined
}

const Banner = (props: Props): React.ReactElement => {
  return (
    <>
      <div className={styles.banner}>
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
      </div>
    </>
  )
}

export default Banner
