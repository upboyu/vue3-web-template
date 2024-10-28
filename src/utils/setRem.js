;(function () {
  const baseSize = 14 // 基础字号，修改后记得同步修改 postcss.config.js
  const setRem = () => {
    const scale = document.documentElement.clientWidth / 1920 // 假设设计稿宽度为 1920px
    document.documentElement.style.fontSize =
      baseSize * Math.min(scale, 2) + 'px' // 最大缩放倍数设为 2
  }
  setRem()
  window.addEventListener('resize', setRem) // 窗口调整时重新计算
})()
