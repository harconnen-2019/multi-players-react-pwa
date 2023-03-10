import { createInitFromApi } from '../lib/initializing'

describe('Инициализация плеера', () => {
  const api = {
    success: 1,
    params: {
      session: 'F2/JRF/9ViQHjSLeI2ObAg==',
    },
    data: {
      init: {
        counters: {
          ga: '',
        },
        defaults: {
          style: {
            win: {
              custom_css: '/api/orange/func/player/ok/custom.css',
              theme: 'default',
              cover: '00000000-0000-0000-0000-000000000000.fav.png',
            },
            pwa: {
              theme: 'default',
              custom_css: '/api/orange/func/player/pwa/custom.css',
              cover: '00000000-0000-0000-0000-000000000000.fav.png',
            },
            ok: {
              cover: '00000000-0000-0000-0000-000000000000.fav.png',
              custom_css: '/api/orange/func/player/ok/custom.css',
              theme: 'default',
            },
            android: {
              cover: '00000000-0000-0000-0000-000000000000.fav.png',
              theme: 'default',
              custom_css: '/api/orange/func/player/android/c`ustom.css',
            },
            cws: {
              cover: '00000000-0000-0000-0000-000000000000.fav.png',
              custom_css: '/api/orange/func/player/ok/custom.css',
              theme: 'default',
            },
            fb: {
              custom_css: '/api/orange/func/player/fb/custom.css',
              theme: 'orange',
              cover: '00000000-0000-0000-0000-000000000000.fav.png',
            },
            vk: {
              cover: '00000000-0000-0000-0000-000000000000.fav.png',
              custom_css: '/api/orange/func/player/vk/custom.css',
              theme: 'default',
            },
          },
          vast: {
            daast: {
              vk: 3149,
              ok: 3152,
              fb: 3150,
              pwa: 3148,
              android: 3151,
            },
          },
        },
        player: {
          single: false,
          email: 'info@myradio.store',
          theme: 'default',
          name: 'player',
          favicon:
            '/preview/image/c/-x-/00000000-0000-0000-0000-000000000000.fav.png',
        },
        app: {},
        vast: {
          android: {
            banner:
              'pos_id=bcont_2876&dest=bcont_2876&w=300&h=250&rtb_url=%2F%2Fssp.audioads.bid%2F%3Fplid%3D2876',
            preroll: '',
          },
          fb: {
            preroll: '',
            banner:
              'pos_id=bcont_2879&dest=bcont_2879&w=300&h=250&rtb_url=%2F%2Fssp.audioads.bid%2F%3Fplid%3D2879',
          },
          cvs: {
            preroll: '',
            banner:
              'pos_id=bcont_2882&dest=bcont_2882&w=300&h=250&rtb_url=%2F%2Fssp.audioads.bid%2F%3Fplid%3D2882',
          },
          vkm: {
            banner:
              'pos_id=bcont_2878&dest=bcont_2878&w=300&h=250&rtb_url=%2F%2Fssp.audioads.bid%2F%3Fplid%3D2878',
            preroll: '',
          },
          ios: {
            banner:
              'pos_id=bcont_34&dest=bcont_34&w=300&h=250&rtb_url=%2F%2Fssp.onlinetv.media%2F%3Fplid%3D34',
            preroll: '',
          },
          windows: {
            preroll: '',
            banner:
              'pos_id=bcont_2883&dest=bcont_2883&w=300&h=250&rtb_url=%2F%2Fssp.audioads.bid%2F%3Fplid%3D2883',
          },
          vk: {
            preroll: '',
            banner:
              'pos_id=bcont_2877&dest=bcont_2877&w=300&h=250&rtb_url=%2F%2Fssp.audioads.bid%2F%3Fplid%3D2877',
          },
          pwa: {
            banner:
              'pos_id=bcont_2875&dest=bcont_2875&w=300&h=250&rtb_url=%2F%2Fssp.audioads.bid%2F%3Fplid%3D2875',
            preroll: '',
          },
          ok: {
            banner:
              'pos_id=bcont_2880&dest=bcont_2880&w=300&h=250&rtb_url=%2F%2Fssp.audioads.bid%2F%3Fplid%3D2880',
            preroll: '',
          },
          default: {
            banner:
              'pos_id=bcont_34&dest=bcont_34&w=300&h=250&rtb_url=%2F%2Fssp.onlinetv.media%2F%3Fplid%3D34',
            preroll: '',
          },
        },
        api: {
          radio_recommend: '/api/orange/base/radio/item/list?recommend=1',
          user_fav_add: '/api/orange/base/user/favourite/create',
          radio_search: '/api/orange/base/radio/item/list?search=',
          user_fav_del: '/api/orange/base/user/favourite/delete',
          radio_list: '/api/orange/base/radio/item/list',
          user_create_account: '/api/orange/base/user/account/create',
          radio_top: '/api/orange/base/radio/item/list?top=1',
          user_fav_list: '/api/orange/base/user/favourite/list',
        },
      },
    },
  }
  const init = createInitFromApi(api, 'FB')

  test('Загрузка всех url api', () => {
    expect(Object.keys(init.api).length === 8).toBe(true)
  })
  test('Загрузка темы плеера', () => {
    expect(Object.keys(init.player).length === 7).toBe(true)
  })
  test('Проверка установки плеера на одно радио', () => {
    expect(init.player.single).toEqual(false)
  })
  test('Проверка выбора платформы', () => {
    expect(init.player.theme).toEqual('orange')
  })
  test('Проверка отсутствия счетчиков', () => {
    expect(init.counters.fb).toEqual(null)
  })
  test('Проверка отсутствия preroll', () => {
    expect(init.advertising.preroll).toEqual(null)
  })
})
