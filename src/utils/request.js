import axios from 'axios'
import qs from 'qs'

const { openLoading, closeLoading } = useLoading()

/**
 * service 使用说明
 *
 * @param {Object} config - 配置选项
 *
 * @param {Boolean | Object} config.showLoading - 是否显示加载动画（默认不显示）。
 *   - 如果为对象：
 *     @property {String} [text] - 加载动画的自定义文本信息（可选）
 *
 * @param {Boolean | String | Object} config.showErrorMessage - 是否显示错误消息（默认不显示）。
 *   - 如果为 `true`：显示接口返回的 `message` 字段，无标题。
 *   - 如果为字符串：作为错误消息的标题，文本显示接口返回的 `message` 字段。
 *   - 如果为对象：
 *     @property {String} [title] - 错误消息的标题（可选，默认为空）。
 *     @property {String} [text] - 错误消息的文本（可选，默认显示接口返回的 `message` 字段）。
 */

// 创建一个 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 60000,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    config.showLoading && openLoading(config.showLoading?.text)
    // 从 localStorage 中获取 token, 将其添加到请求头中
    const token = localStorage.getItem('X-Token')
    const clientId = localStorage.getItem('X-ClientId')
    if (token && clientId) {
      config.headers['X-Token'] = token
      config.headers['X-ClientId'] = clientId
    }
    return config
  },
  (error) => {
    closeLoading()
    return handleError(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  async (response) => {
    closeLoading()
    const { status, data, config } = response

    // 如果后端返回的状态码不为 200，表示有错误
    if (status !== 200) return handleError(response)

    // json
    if (data?.returnCode) return data.returnCode === '000000' ? data.resData : handleError(response)

    // blob
    if (config?.responseType === 'blob') {
      // 处理文件下载失败
      if (data?.type === 'application/json') {
        const data = (response.data = JSON.parse(await response.data.text()))
        return data.returnCode === '000000' ? data.resData : handleError(response)
      }
      return data
    }

    // 其他
    return data
  },
  (error) => {
    closeLoading()
    return handleError(error)
  },
)

function handleError(result) {
  const { data = result, config: { showErrorMessage } = {} } = result

  // web
  showErrorMessage &&
    proxy.$message.error(
      `${
        typeof showErrorMessage === 'object'
          ? showErrorMessage.title + ': '
          : typeof showErrorMessage === 'string'
            ? showErrorMessage + ': '
            : undefined
      }${showErrorMessage?.text || data?.message}`,
    )

  return Promise.reject(data)
}

export default service

export const getImageUrl = async (config) => {
  try {
    const data = await service({ method: 'get', responseType: 'blob', ...config })
    return URL.createObjectURL(data)
  } catch (error) {
    console.error('请求图片失败:', error)
    throw error
  }
}
