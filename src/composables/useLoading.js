export function useLoading() {
  let loadingInstance

  const openLoading = (text = '加载中...') => {
    loadingInstance = ElLoading.service({
      text: text,
      lock: true,
      background: 'rgba(0, 0, 0, 0.7)',
    })
  }

  const closeLoading = () => {
    loadingInstance?.close?.()
  }

  return { openLoading, closeLoading }
}
