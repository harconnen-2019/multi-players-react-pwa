import * as CONFIG from '../../config'
import styles from './Load.module.css'

interface Props {
  err: boolean
  platform: string | undefined
}

const Load = ({ err, platform }: Props) => {
  if (err) {
    return (
      <div className={styles.error}>
        An error occured!
        <br />
        <em>We are sorry. We are already working on it...</em>
      </div>
    )
  } else {
    return (
      <div
        className={`${styles.load} ${
          platform === CONFIG.PLATFORM.ANDROID ? styles.android : ''
        }`}
      >
        Initializing the player.
        <br />
        <em>If you wait a long time, check your network connection...</em>
      </div>
    )
  }
}

export default Load
