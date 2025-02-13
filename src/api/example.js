import service from '@/utils/request'

export function badRequest(data) {
  return service({
    url: '/v3/b7afcf32-4a9d-4ea1-9d9d-730ec8d4927b',
    method: 'post',
    data,
    showErrorMessage: true,
    showLoading: true,
  })
}

export function getUserInfo(params) {
  return service({
    url: 'v3/714e4d95-5928-4f96-9211-480f3460f38e',
    method: 'get',
    params,
  })
}
