import { getStreamFromApi, Radio } from './radio'
import { SingleRadioRequest } from '../interfaces/radio'

describe('Radio', () => {
  const input: SingleRadioRequest = {
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
        // code: 'EU',
        name: 'Europe',
      },
      {
        name: 'Russia',
        // code: 'RU',
        // id: 2017370,
      },
      {
        // id: 472757,
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
  const radio = new Radio(input, 0, 'fb')
  // beforeAll(() => {})

  test('В радио объект "Streams" не пустой', () => {
    expect(getStreamFromApi(input.streams)).toBe(true)
  })
  test('Поле note выводиться из двух параметров', () => {
    expect(radio.note).toEqual('Europe, on-line')
  })
  test('Формируем массив жанры', () => {
    expect(radio.genres).toEqual(['Entertainment', 'Top', '90x'])
  })
  test('Формируем текущий stream', () => {
    expect(radio.playStream).toEqual([
      {
        type: 'audio/mp4',
        src: 'https://maximum.hostingradio.ru/maximum96.aacp?type=.flv',
      },
    ])
  })
  test('Метод изменения stream', () => {
    radio.selectStream('88')
    expect(radio.playStream).toEqual([
      {
        type: 'audio/aac',
        src: 'https://maximum.hostingradio.ru/maximum96.aacp',
      },
    ])
  })
  test('Формируем массив битрейт', () => {
    expect(radio.bits).toEqual(['0', '88'])
  })
  // test('Добавление в избранное', () => {
  //   radio.favoriteAdd()
  //   expect(radio.favorites).toBe(true)
  // })
  // test('Удаление из избранного', () => {
  //   radio.favoriteDel()
  //   expect(radio.favorites).toBe(false)
  // })
  test('Правильно выбрана платформа', () => {
    expect(radio.vast).toBe(3150)
  })
})
