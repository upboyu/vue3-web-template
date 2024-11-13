// 快速生成与服务器存储相关的三个配置项
import { ref } from 'vue'

import { getColumns, setColumns } from '@/api/tableConfig'

export function useColumnsStorageConfig(key = 'default', merge = false) {
  const url = `${location.href.split('?')[0]}-${key}`

  // 从服务器获取列信息
  const columnsState = ref({})
  getColumns({ url }).then((res) => {
    try {
      columnsState.value = JSON.parse(res?.config || '{}')
    } catch (error) {
      console.error(error)
    }
  })

  // 上传本地列信息到服务器
  function onColumnsStateChange(columns) {
    const data = {
      config: merge
        ? JSON.stringify({ ...columnsState.value, ...columns })
        : JSON.stringify(columns),
      url,
    }
    setColumns(data).then(() => {})
  }

  return {
    columnsStorageConfig: {
      columnsState,
      onColumnsStateChange,
      columnsStorageKey: key,
    },
  }
}
