// 快速生成与服务器存储相关的三个配置项
import { ref } from 'vue'

import { getColumns, setColumns } from '@/api/tableConfig'

export function useColumnsStorageConfig(key = 'default') {
  const url = `${location.href.split('?')[0]}-${key}`

  const columnsState = ref([])
  // 从服务器获取列信息
  getColumns().then((res) => {
    columnsState.value = res.find((item) => item.url === url)?.config
  })

  // 上传本地列信息到服务器
  function onColumnsStateChange(columns) {
    const data = {
      config: JSON.stringify(columns),
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
