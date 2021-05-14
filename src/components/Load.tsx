import './css/load.css'

interface Props {
  err: boolean
}

const Load = ({ err }: Props) => {
  if (err) {
    return (
      <div className='error'>
        An error occured!
        <br />
        <em>We are sorry. We are already working on it...</em>
      </div>
    )
  } else {
    return (
      <div className='load'>
        Initializing the player.
        <br />
        <em>If you wait a long time, check your network connection...</em>
      </div>
    )
  }
}

export default Load