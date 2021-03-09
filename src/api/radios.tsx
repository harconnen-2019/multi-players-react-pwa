export type ApiRadioListRequest = {
  success: number
  params: {
    session: string
  }
  data: {
    list_radio: ApiSubRadioRequest[]
  }
}

export type ApiSubRadioRequest = {
  vast: {
    daast: {
      [item: string]: number
    }
  }
  play_now: {
    name: string
  }
  moods: ApiSubTagsRequest[]
  origins: { [key: string]: string }[]
  cover: string
  streams: ApiSubStreamsRequest
  id: string
  is_recommend: number
  genres: ApiSubTagsRequest[]
  description: string
  fm: string
  alias: string
  status: number
  name: string
  is_top: number
  partner_id: string
  license: string
}

export type ApiSubTagsRequest = {
  name: string
  id: string
  alias: string
  status: number
}

export type ApiSubStreamsRequest = {
  [key: string]: [
    {
      type: string
      id: string
      mime: string
      bitrate: number
      samplerate: number
      url: string
      status: number
      radio_id: string
    }
  ]
}
