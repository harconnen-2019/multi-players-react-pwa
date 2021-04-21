import React from 'react'
import './css/banner.css'

interface Props {}

const Banner: React.FC = (props: Props) => {
  return (
    <>
      <aside>
        <iframe
          title='Coffee PWA'
          src={
            './adv_frame.html?' +
            //   this.props.playerStore.apibanner +
            '&genre='
            //   this.props.playerStore.genre.join()
          }
          id='advrefreshh'
          // allowtransparency='true'
          // hidefocus='true'
        ></iframe>
      </aside>
    </>
  )
}

export default Banner
