<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :columnsState="columnsState"
    @columnsStateChange="columnsStateChange"
    :columnsStorageKey="columnsStorageKey"
  >
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

const { columnsState, columnsStateChange, columnsStorageKey } = useColumnsStorageConfig()
</script>
