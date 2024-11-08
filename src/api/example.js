import service from '@/utils/request'

export function login(data) {
  return service({
    url: '/user/login',
    method: 'post',
    data,
  })
}

export function getUserInfo(params) {
  return service({
    url: '/user/info',
    method: 'get',
    params,
  })
}
