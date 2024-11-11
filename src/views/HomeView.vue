<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :columnsStorageConfig="{
      columnsState: columnsState,
      onColumnsStateChange: onColumnsStateChange,
      columnsStorageKey: 'foo',
    }"
  >
    <el-table-column prop="date" label="Date" width="180" visible />
    <el-table-column prop="name" label="Name" width="180" :visible="false" />
    <el-table-column prop="address" label="Address" />
  </el-table>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" visible />
    <el-table-column prop="name" label="Name" width="180" :visible="false" />
    <el-table-column prop="address" label="Address" />
  </el-table>
</template>

<script setup>
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

const columnsState = ref([])

// 捕获状态改变
function onColumnsStateChange(params) {
  console.log(params)
}

// 模拟获取服务器存储数据
setTimeout(() => {
  columnsState.value = JSON.stringify([
    { key: 'Date', label: 'Date', visible: false, disabled: false },
    { key: 'Name', label: 'Name', visible: false, disabled: false },
    { key: 'Address', label: 'Address', visible: true, disabled: true },
  ])
}, 1000)
</script>
