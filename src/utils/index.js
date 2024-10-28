export function pxToReal(designPx) {
  const designWidth = 1920 // 设计稿
  const deviceWidth = window.innerWidth // 设备

  return designPx * (designWidth / deviceWidth)
}
