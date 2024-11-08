// 快速生成与服务器存储相关的三个配置项
export function useColumnsStorageConfig(key) {
  const columnsState = ref([])
  // 从服务器获取列信息
  // getColumns().then(res => {
  //   columnsState.value = res
  // })

  function columnsStateChange(columns) {
    console.log(columns)
    // 上传本地列信息到服务器
    // setColumns(columns).then(() => {})
  }

  return {
    columnsState,
    columnsStateChange,
    columnsStorageKey: key ?? 'default',
  }
}
