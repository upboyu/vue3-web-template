<template>
  <el-table
    ref="tableRef"
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
  <el-table
    :data="tableData"
    style="width: 100%"
    :columnsStorageConfig="{
      columnsStorageKey: 'bar',
    }"
  >
    <el-table-column prop="date" label="Date" width="180" visible />
    <el-table-column prop="name" label="Name" width="180" :visible="false" />
    <el-table-column prop="address" label="Address" />
  </el-table>

  <el-button size="mini" @click="handleClick()">el button</el-button>
</template>

<script setup>
import { nextTick } from 'vue'

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
  columnsState.value = JSON.stringify({
    Date: false,
    Name: false,
    Address: false,
  })
}, 1000)

const tableRef = ref()
nextTick(() => {
  console.log(111, tableRef.value)
})

// button
import { badRequest } from '@/api/example'
function handleClick() {
  badRequest()
}
</script>
