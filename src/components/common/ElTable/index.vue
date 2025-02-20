<!-- 对 el-table 和 el-table-column 进行了二次封装，说明如下
  1.el-table-column 
    - visible 属性：开启"显隐列"功能。此外 visible 还可以指定一个初始值，类型为 boolean。（例如：:visible='false' 表示初始状态为隐藏。如果初始值不指定 默认为 true） 
  2.el-table
    - columns-state 属性，columns-state-change 方法：设置和捕获显示隐藏列的状态变化。
    - columns-storage-key 属性：开启本地存储，并指定一个当前页面范围内独一无二的 key 值
-->
<template>
  <div class="custom-el-table-wrap">
    <table-toolbar @checkboxChange="handleCheckboxChange" />
    <el-table ref="tableRef" v-bind="$attrs">
      <template v-for="(_, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps" />
      </template>
    </el-table>
  </div>
</template>

<script setup name="CustomElTable">
import { ref, reactive, computed, provide, nextTick, watch, unref, defineExpose } from 'vue'
import { useStorage } from '@vueuse/core'

import { ElTable } from 'element-plus'
import TableToolbar from './TableToolbar.vue'

const props = defineProps({
  columnsStorageConfig: {
    type: Object,
    default: () => ({}),
  },
})

const columnsState = computed(() => unref(props.columnsStorageConfig?.columnsState))
const columnsStorageKey = computed(() => props.columnsStorageConfig?.columnsStorageKey)
const onColumnsStateChange = computed(() => props.columnsStorageConfig?.onColumnsStateChange)

const tableRef = ref()
const defaultColumns = reactive([]) // 初始列状态
const columns = // 本地列状态
  columnsStorageKey.value === undefined
    ? ref([])
    : useStorage(`columnsStorage:${location.href}-${columnsStorageKey.value}`, [])

provide('defaultColumns', defaultColumns)
provide('columns', columns)

// 防止页面闪烁
watch(columns, () => nextTick(() => tableRef.value.doLayout()), { deep: true })

// 复选框变化时，将 columns 同步到外部
const handleCheckboxChange = () => {
  if (!onColumnsStateChange.value) return
  const res = columns.value.reduce((acc, { label, visible }) => ({ ...acc, [label]: visible }), {})
  onColumnsStateChange.value(res)
}

// 初始化完成后 将外部列状态和初始列状态合并到 columns
nextTick(() => {
  columns.value = defaultColumns.map((col) => ({
    ...col,
    visible: columns.value.find((item) => item.label === col.label)?.visible ?? col.visible,
  }))

  syncColumnsState()
})

// 持续监听外部列状态，将其同步到 columns
watch(columnsState, syncColumnsState, { deep: true })

function syncColumnsState() {
  // 兼容 string
  let _columnsState
  try {
    _columnsState =
      typeof columnsState.value === 'string' ? JSON.parse(columnsState.value) : columnsState.value
  } catch (error) {
    console.error(error)
  }
  // 处理错误格式
  if (!isPlainObject(_columnsState)) return
  function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
  }
  // 同步到本地
  Object.entries(_columnsState).forEach(([label, visible]) => {
    const column = columns.value.find((item) => item.label === label)
    column && !column.disabled && (column.visible = visible)
  })
}

// 继承 Exposes
const exposes = {}
defineExpose(exposes)

nextTick(() => {
  // Object.assign(exposes, tableRef.value)
  // Object.entries(tableRef.value).forEach(([key, value]) => (exposes[key] = value))
  // console.log(tableRef.value)

  const EXPOSES = [
    'clearSelection',
    'getSelectionRows',
    'toggleRowSelection',
    'toggleAllSelection',
    'toggleRowExpansion',
    'setCurrentRow',
    'clearSort',
    'clearFilter',
    'doLayout',
    'sort',
    'scrollTo',
    'setScrollTop',
    'setScrollLeft',
    'columns',
    'updateKeyChildren',
  ]
  EXPOSES.forEach((item) => (exposes[item] = tableRef.value[item]))
})
</script>

<style lang="scss" scoped>
.custom-el-table-wrap {
  position: relative;
  clear: both;
}
</style>
