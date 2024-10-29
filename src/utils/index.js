export function storageToken() {
  const params = new URLSearchParams(
    window.location.search || window.location.hash.split('?').slice(1).join('&'),
  )
  const token = params.get('X-Token')
  const clientId = params.get('X-ClientId')
  const event = params.get('event')
  const source = params.get('source')

  if (token && clientId) {
    // 存储地址栏参数
    localStorage.setItem('X-Token', token)
    localStorage.setItem('X-ClientId', clientId)

    // 移除地址栏参数
    const url = new URL(window.location.href)
    url.search = ''
    url.hash = url.hash.split('?')[0]

    window.history.replaceState({}, '', url.href)
  }

  // 存储 event source
  localStorage.setItem('event', event)
  localStorage.setItem('source', source)
}

export function pxToReal(designPx) {
  const designWidth = 1920 // 设计稿
  const deviceWidth = window.innerWidth // 设备

  return designPx * (designWidth / deviceWidth)
}
