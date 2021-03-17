const Sprite = () => {
  return (
    <div className='sprite'>
      <svg
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
      >
        <symbol id='volume' viewBox='0 0 256 512'>
          <path d='M215 71l-89 89H24a24 24 0 0 0-24 24v144a24 24 0 0 0 24 24h102.06L215 441c15 15 41 4.47 41-17V88c0-21.47-26-32-41-17z'></path>
        </symbol>
        <symbol id='mute' viewBox='0 0 512 512'>
          <path d='M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM461.64 256l45.64-45.64c6.3-6.3 6.3-16.52 0-22.82l-22.82-22.82c-6.3-6.3-16.52-6.3-22.82 0L416 210.36l-45.64-45.64c-6.3-6.3-16.52-6.3-22.82 0l-22.82 22.82c-6.3 6.3-6.3 16.52 0 22.82L370.36 256l-45.63 45.63c-6.3 6.3-6.3 16.52 0 22.82l22.82 22.82c6.3 6.3 16.52 6.3 22.82 0L416 301.64l45.64 45.64c6.3 6.3 16.52 6.3 22.82 0l22.82-22.82c6.3-6.3 6.3-16.52 0-22.82L461.64 256z'></path>
        </symbol>
        <symbol id='favorite' viewBox='0 0 512 512'>
          <path d='M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z'></path>
        </symbol>
        <symbol id='favorite-add' viewBox='0 0 512 512'>
          <path d='M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z'></path>
        </symbol>
        <symbol id='genres' viewBox='0 0 512 512'>
          <path d='M470.38 1.51L150.41 96A32 32 0 0 0 128 126.51v261.41A139 139 0 0 0 96 384c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V214.32l256-75v184.61a138.4 138.4 0 0 0-32-3.93c-53 0-96 28.66-96 64s43 64 96 64 96-28.65 96-64V32a32 32 0 0 0-41.62-30.49z'></path>
        </symbol>
        <symbol id='moods' viewBox='0 0 384 512'>
          <path d='M120 72c0-39.765 32.235-72 72-72s72 32.235 72 72c0 39.764-32.235 72-72 72s-72-32.236-72-72zm254.627 1.373c-12.496-12.497-32.758-12.497-45.254 0L242.745 160H141.254L54.627 73.373c-12.496-12.497-32.758-12.497-45.254 0-12.497 12.497-12.497 32.758 0 45.255L104 213.254V480c0 17.673 14.327 32 32 32h16c17.673 0 32-14.327 32-32V368h16v112c0 17.673 14.327 32 32 32h16c17.673 0 32-14.327 32-32V213.254l94.627-94.627c12.497-12.497 12.497-32.757 0-45.254z'></path>
        </symbol>
        <symbol id='setting' viewBox='0 0 512 512'>
          <path d='M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z'></path>
        </symbol>
        <symbol id='bars' viewBox='0 0 448 512'>
          <path d='M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z'></path>
        </symbol>
        <symbol id='play' viewBox='0 0 448 512'>
          <path d='M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z'></path>
        </symbol>
        <symbol id='step-backward' viewBox='0 0 448 512'>
          <path d='M64 468V44c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12v176.4l195.5-181C352.1 22.3 384 36.6 384 64v384c0 27.4-31.9 41.7-52.5 24.6L136 292.7V468c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12z'></path>
        </symbol>
        <symbol id='step-forward' viewBox='0 0 448 512'>
          <path d='M384 44v424c0 6.6-5.4 12-12 12h-48c-6.6 0-12-5.4-12-12V291.6l-195.5 181C95.9 489.7 64 475.4 64 448V64c0-27.4 31.9-41.7 52.5-24.6L312 219.3V44c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12z'></path>
        </symbol>
        <symbol id='pause' viewBox='0 0 448 512'>
          <path d='M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z'></path>
        </symbol>
        <symbol id='search' viewBox='0 0 512 512'>
          <path d='M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z'></path>
        </symbol>
        <symbol id='language' viewBox='0 0 512 512'>
          <path d='m373.851562 308.296875c-1.445312-4.820313-7.390624-7.074219-13.496093-7.074219-5.945313 0-11.890625 2.253906-13.335938 7.074219l-31.011719 101.0625c-.160156.644531-.320312 1.285156-.320312 1.605469 0 5.144531 7.550781 8.675781 13.175781 8.675781 3.535157 0 6.265625-1.121094 7.070313-4.175781l6.101562-21.371094h36.796875l6.109375 21.371094c.800782 3.054687 3.53125 4.175781 7.066406 4.175781 5.625 0 13.175782-3.691406 13.175782-8.675781 0-.480469-.160156-.964844-.320313-1.605469zm-27.476562 69.40625 13.976562-49.324219 13.984376 49.324219zm0 0' />
          <path d='m456.835938 208.867188h-153.707032v-65.648438l49.953125-35.679688c3.941407-2.816406 6.28125-7.359374 6.28125-12.203124 0-4.847657-2.339843-9.390626-6.28125-12.207032l-50.554687-36.109375c-3.949219-26.570312-26.914063-47.019531-54.5625-47.019531h-192.796875c-30.421875 0-55.167969 24.746094-55.167969 55.167969v192.800781c0 30.417969 24.746094 55.164062 55.167969 55.164062h153.703125v65.648438l-49.953125 35.679688c-3.941407 2.816406-6.28125 7.363281-6.28125 12.207031s2.339843 9.390625 6.28125 12.203125l50.554687 36.109375c3.949219 26.570312 26.914063 47.019531 54.5625 47.019531h192.800782c30.417968 0 55.164062-24.75 55.164062-55.167969v-192.796875c0-30.421875-24.746094-55.167968-55.164062-55.167968zm-401.667969 64.265624c-13.878907 0-25.167969-11.289062-25.167969-25.167968v-192.800782c0-13.875 11.289062-25.164062 25.167969-25.164062h192.796875c13.875 0 25.164062 11.289062 25.164062 25.164062 0 4.847657 2.339844 9.394532 6.28125 12.207032l39.144532 27.960937-39.144532 27.960938c-3.941406 2.816406-6.28125 7.363281-6.28125 12.207031v73.367188h-9.09375c-30.417968 0-55.164062 24.746093-55.164062 55.164062v9.101562zm426.832031 183.699219c0 13.878907-11.289062 25.167969-25.164062 25.167969h-192.800782c-13.875 0-25.164062-11.289062-25.164062-25.167969 0-4.84375-2.339844-9.390625-6.28125-12.203125l-39.144532-27.960937 39.144532-27.960938c3.941406-2.816406 6.28125-7.363281 6.28125-12.207031v-112.464844c0-13.878906 11.289062-25.167968 25.164062-25.167968h24.054688.039062.039063 168.667969c13.875 0 25.164062 11.289062 25.164062 25.167968zm0 0' />
          <path d='m197.652344 138.277344c4.667968 0 8.457031-3.789063 8.457031-8.460938s-3.789063-8.460937-8.457031-8.460937h-37.628906v-20.539063c0-4.671875-3.789063-8.460937-8.460938-8.460937-4.667969 0-8.457031 3.789062-8.457031 8.460937v20.539063h-37.628907c-4.667968 0-8.457031 3.789062-8.457031 8.460937s3.789063 8.460938 8.457031 8.460938h11.660157c1.863281 17.863281 9.566406 34.007812 21.152343 46.511718-9.605468 5.75-20.824218 9.070313-32.8125 9.070313-4.667968 0-8.457031 3.785156-8.457031 8.457031s3.789063 8.460938 8.457031 8.460938c17.117188 0 32.996094-5.351563 46.085938-14.453125 13.09375 9.101562 28.972656 14.453125 46.089844 14.453125 4.667968 0 8.457031-3.789063 8.457031-8.460938s-3.789063-8.457031-8.457031-8.457031c-11.988282 0-23.207032-3.3125-32.8125-9.070313 11.585937-12.503906 19.289062-28.648437 21.152344-46.511718zm-46.089844 35.941406c-9.253906-9.605469-15.539062-22.078125-17.378906-35.941406h34.761718c-1.839843 13.863281-8.125 26.335937-17.382812 35.941406zm0 0' />
        </symbol>
        <symbol id='quality' viewBox='0 0 640 512'>
          <path d='M216 288h-48c-8.84 0-16 7.16-16 16v192c0 8.84 7.16 16 16 16h48c8.84 0 16-7.16 16-16V304c0-8.84-7.16-16-16-16zM88 384H40c-8.84 0-16 7.16-16 16v96c0 8.84 7.16 16 16 16h48c8.84 0 16-7.16 16-16v-96c0-8.84-7.16-16-16-16zm256-192h-48c-8.84 0-16 7.16-16 16v288c0 8.84 7.16 16 16 16h48c8.84 0 16-7.16 16-16V208c0-8.84-7.16-16-16-16zm128-96h-48c-8.84 0-16 7.16-16 16v384c0 8.84 7.16 16 16 16h48c8.84 0 16-7.16 16-16V112c0-8.84-7.16-16-16-16zM600 0h-48c-8.84 0-16 7.16-16 16v480c0 8.84 7.16 16 16 16h48c8.84 0 16-7.16 16-16V16c0-8.84-7.16-16-16-16z'></path>
        </symbol>
      </svg>
    </div>
  )
}
export default Sprite
