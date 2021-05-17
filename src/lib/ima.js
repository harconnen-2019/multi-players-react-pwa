const google = window.google

var videoElement
var adsLoaded = false
var adContainer
var adDisplayContainer
var adsLoader
var adsManager

let initIma = false

setTimeout(() => {
  // window.addEventListener('load', function (event) {
  videoElement = document.getElementById('content_audio_html5_api')
  videoElement.addEventListener('play', function (event) {
    loadAds(event)
  })
  // })
}, 700)

export function initializeIMA(tag, playAd) {
  initIma = playAd
  adContainer = document.getElementById('ad-container')

  adDisplayContainer = new google.ima.AdDisplayContainer(
    adContainer,
    videoElement
  )
  adsLoader = new google.ima.AdsLoader(adDisplayContainer)

  adsLoader.addEventListener(
    google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
    onAdsManagerLoaded,
    false
  )
  // .  adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, onAdError, false)

  // Let the AdsLoader know when the video has ended
  videoElement.addEventListener('ended', function () {
    adsLoader.contentComplete()
  })

  // this.player.ima.setContentWithAdTag(null, this.SAMPLE_AD_TAG, false);
  // this.player.ima.requestAds();
  var adsRequest = new google.ima.AdsRequest()
  adsRequest.adTagUrl = tag

  // Pass the request to the adsLoader to request ads
  adsLoader.requestAds(adsRequest)
}

function loadAds(event) {
  // Prevent this function from running on if there are already ads loaded
  if (!initIma && adsLoaded) {
    return
  }
  adsLoaded = true
  initIma = false

  // Prevent triggering immediate playback when ads are loading
  event.preventDefault()

  console.log('loading ads')

  // Initialize the container. Must be done via a user action on mobile devices.
  // videoElement.load();
  adDisplayContainer.initialize()

  try {
    adsManager.init(google.ima.ViewMode.NORMAL)
    adsManager.start()
  } catch (adError) {
    // Play the video without ads, if an error occurs
    console.log('AdsManager could not be started')
    videoElement.play()
  }
}

function onAdsManagerLoaded(adsManagerLoadedEvent) {
  // Instantiate the AdsManager from the adsLoader response and pass it the video element
  adsManager = adsManagerLoadedEvent.getAdsManager(videoElement)

  adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, onAdError)
  adsManager.addEventListener(google.ima.AdEvent.Type.STARTED, onContentStarted)
  adsManager.addEventListener(
    google.ima.AdEvent.Type.COMPLETE,
    onContentStopped
  )
  adsManager.addEventListener(
    google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
    onContentPauseRequested
  )
  adsManager.addEventListener(
    google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
    onContentResumeRequested
  )
}

function onAdError(adErrorEvent) {
  // Handle the error logging.
  console.log(adErrorEvent.getError())
  if (adsManager) {
    adsManager.destroy()
  }
}

function onContentStarted() {
  // console.log('ads start')
  document.getElementById('ads-play').className = 'play-adson'
}
function onContentStopped() {
  // console.log('ads stop')
  document.getElementById('ads-play').className = 'play-adsoff'
}
function onContentPauseRequested() {
  videoElement.pause()
}

function onContentResumeRequested() {
  setTimeout(() => {
    videoElement.play()
  }, 600)
}
