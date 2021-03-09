import { getStreamFromApi, Radio } from './radio'

describe('Radio', () => {
  const input = {
    genres: [
      {
        name: 'Entertainment',
        id: '5f3eab34-0000-0000-0000-0000aa5e3417',
        alias: 'entertainment',
        status: 1,
      },
      {
        name: 'Top',
        id: '5f3eab34-0000-0000-0000-0000aa5e3417',
        alias: 'entertainment',
        status: 1,
      },
      {
        name: '90x',
        id: '5f3eab34-0000-0000-0000-0000aa5e3417',
        alias: 'entertainment',
        status: 1,
      },
    ],
    description:
      'ArtRemixRadio, Радио танцевальных ремиксов, Nizhniy Novgorod. Live stream plus station schedule and song playlist. Listen to your favorite radio stations.',
    fm: 'on-line',
    status: 1,
    alias: 'stp_230728',
    is_top: 0,
    name: 'ArtRemixRadio - Nizhniy Novgorod',
    partner_id: '00000000-0000-0000-0000-000000000001',
    license: '',
    vast: {
      daast: {
        android: 3151,
        fb: 3150,
        vk: 3149,
        pwa: 3148,
        ok: 3152,
        site: 3148,
      },
    },
    play_now: {
      name: 'Europe : Entertainment',
    },
    moods: [],
    origins: [
      {
        code: 'EU',
        name: 'Europe',
      },
      {
        name: 'Russia',
        code: 'RU',
        id: 2017370,
      },
      {
        id: 472757,
        name: 'Volgograd',
      },
    ],
    cover:
      'https://s4.myradio.center/preview/image/c/100x100/5f2beda6-0000-0000-0000-0000802c3407.rws.jpg',
    streams: {
      '0': [
        {
          type: 'flash',
          id: '76124',
          bitrate: 0,
          samplerate: 44100,
          radio_id: '5d54294f-0000-0000-0000-0000a9e72066',
          url: 'https://maximum.hostingradio.ru/maximum96.aacp?type=.flv',
          mime: 'audio/mp4',
          status: 1,
        },
      ],
      '88': [
        {
          mime: 'audio/aac',
          status: 1,
          samplerate: 44100,
          radio_id: '5d54294f-0000-0000-0000-0000a9e72066',
          url: 'https://maximum.hostingradio.ru/maximum96.aacp',
          id: '75803',
          type: 'aac',
          bitrate: 88,
        },
      ],
    },
    id: '5f2beda6-0000-0000-0000-0000802c3407',
    is_recommend: 0,
  }
  beforeAll(() => {})

  test('Проверка Радио на наличие объекта "Streams"', () => {
    expect(getStreamFromApi(input.streams)).toEqual(true)
  })
  test('Проверка Радио на отсутствие объекта "Streams"', () => {
    const input = {}
    expect(getStreamFromApi(input)).toEqual(false)
  })
  test('Поле note выводиться', () => {
    const radio = new Radio(input, 0, 'pwa')
    expect(radio.note).toEqual('Europe, on-line')
  })
  test('Формируем массив жанров', () => {
    const radio = new Radio(input, 0, 'pwa')
    expect(radio.genres).toEqual(['Entertainment', 'Top', '90x'])
  })
  test('Добавление в избранное', () => {
    const radio = new Radio(input, 0, 'pwa')
    radio.favoriteAdd()
    expect(radio.favorites).toEqual(true)
  })
  test('Проверка методов Класса Radio', () => {
    const radio = new Radio(input, 0, 'pwa')
    expect(radio.index).toEqual(0)
  })
})
