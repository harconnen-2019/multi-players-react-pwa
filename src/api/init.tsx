export type ApiInitRequest = {
  data: {
    init: {
      defaults: {
        style: {
          [key: string]: {
            custom_css: string
            theme: string
            cover: string
          }
        }
        vast: {
          daast: {
            [item: string]: number
          }
        }
      }
      app: {}
      vast: {
        [key: string]: {
          banner: string
          preroll: string
        }
      }
      api: {
        [item: string]: string
      }
      player: {
        single: boolean
        email: string
        theme: string
        favicon: string
      }
      counters: {
        [item: string]: string
      }
    }
  }
  success: number
  params: {
    session: string
  }
}
