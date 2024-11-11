// import service from '@/utils/request'

export function setColumns(data) {
  return service({
    url: '/user/tableConfig',
    method: 'post',
    data,
  })
}

export function getColumns(params) {
  return service({
    url: '/user/tableConfig',
    method: 'get',
    params,
  })
}
