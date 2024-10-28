<!-- 对 el-table 和 el-table-column 进行了二次封装，说明如下
  1.el-table-column 支持了 visible 属性，用于开启"显隐列"。
    a.此外 还可以指定一个初始值，类型为 boolean。（例如：:visible='false' 表示初始状态为隐藏。初始值不指定 默认为 true）
    b.状态支持本地存储
  2.已集成到此项目，组件名仍为 el-table 和 el-table-column 保持不变。直接使用默认会替换掉 element-plus 库的 el-table 和 el-table-column。
-->
<template>
  <div class="custom-el-table-wrap">
    <table-toolbar :columns="columnsVisible"></table-toolbar>
    <el-table ref="tableRef" v-bind="$attrs">
      <template v-for="(_, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps" />
      </template>
    </el-table>
  </div>
</template>

<script setup name="CustomElTable">
import { ElTable } from 'element-plus'

const tableRef = ref()
const columnsVisible = reactive([])
provide('columnsVisible', columnsVisible)

// 防止页面闪烁
watch(columnsVisible, () => {
  nextTick(() => {
    tableRef.value.doLayout()
  })
})
</script>

<style lang="scss" scoped>
.custom-el-table-wrap {
  position: relative;
}
</style>
