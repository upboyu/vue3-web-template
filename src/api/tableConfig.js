// import service from '@/utils/request'

export function getColumns(params) {
  return Promise.resolve({
    config: JSON.stringify({
      aaa: false,
      bbb: true,
      Date: false,
      Name: false,
      Address: false,
    }),
    url: 'http://localhost/about-default',
  })
  // return service({
  //   url: '/user/tableConfig',
  //   method: 'get',
  //   params,
  // })
}

export function setColumns(data) {
  return Promise.resolve({})
  // return service({
  //   url: '/user/tableConfig',
  //   method: 'post',
  //   data,
  // })
}
