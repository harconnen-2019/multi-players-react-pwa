/**
 * Подключаемые счетчики Ga, Fb, Vk
 * @module lib/counters
 */

/**
 * Вставляет счетчик Google в HEAD
 * @function
 * @param {string} id - Идентификатор счетчика из Init
 * @returns {void}
 */
export function counterGa(id: string | null): void {
  const scriptCountGoogle: string = `<script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());
    gtag('config', 'UA-197463705-1');
    ${id && `gtag('config', '${id}');`}
    </script>`
  const head = document.getElementsByTagName('head')[0]
  const createNodeScript1 = document.createElement('script')
  createNodeScript1.setAttribute(
    'src',
    'https://www.googletagmanager.com/gtag/js?id=UA-197463705-1'
  )
  const createNodeScript2 = document.createElement('script')
  createNodeScript2.text = scriptCountGoogle.replace(/<[^>]*>?/gm, '')
  head.appendChild(createNodeScript1)
  head.appendChild(createNodeScript2)
}

/**
 * Вставляет счетчик Вконтакте в HEAD
 * @function
 * @param {string} id - Идентификатор счетчика из Init
 * @returns {void}
 */
export function counterVk(id: string): void {
  const scriptCountVk =
    `<script type="text/javascript">!function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="https://vk.com/js/api/openapi.js?168",t.onload=function(){VK.Retargeting.Init("` +
    id +
    `"),VK.Retargeting.Hit()},document.head.appendChild(t)}();</script><noscript><img src="https://vk.com/rtrg?p=` +
    id +
    `" style="position:fixed; left:-999px;" alt=""/></noscript>`
  const head = document.getElementsByTagName('head')[0]
  const createNodeScript = document.createElement('script')
  createNodeScript.setAttribute('type', 'text/javascript')
  createNodeScript.text = scriptCountVk.replace(/<[^>]*>?/gm, '')
  head.appendChild(createNodeScript)
}

/**
 * Вставляет счетчик Facebook в HEAD
 * @function
 * @param {string} id - Идентификатор счетчика из Init
 * @returns {void}
 */
export function counterFb(id: string): void {
  const scriptCountFb =
    `<script>
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '` +
    id +
    `');
      fbq('track', 'PageView');
      </script>
      <noscript><img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=` +
    id +
    `&ev=PageView&noscript=1"
      /></noscript>`
  const head = document.getElementsByTagName('head')[0]
  const createNodeScript = document.createElement('script')
  createNodeScript.text = scriptCountFb.replace(/<[^>]*>?/gm, '')
  head.appendChild(createNodeScript)
}
