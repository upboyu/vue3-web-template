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
import { ElTable } from 'element-plus'
import TableToolbar from './TableToolbar.vue'

const props = defineProps({
  columnsState: [Array, String],
  columnsStorageKey: String,
})
const { columnsState } = toRefs(props)
const emit = defineEmits(['columnsStateChange'])

const tableRef = ref()
const defaultColumns = reactive([]) // 默认设置
const columns = // 当前设置
  props.columnsStorageKey === undefined
    ? ref([])
    : useStorage(`columnsStorage:${location.href}-${props.columnsStorageKey}`, [])

provide('defaultColumns', defaultColumns)
provide('columns', columns)

// 防止页面闪烁
watch(columns, () => nextTick(() => tableRef.value.doLayout()), { deep: true })

// 将内部数据同步到外部
function handleCheckboxChange() {
  emit('columnsStateChange', columns.value)
}

// 将外部数据同步到内部
watch(columnsState, () => columnsStateToLocal(), { deep: true })
function columnsStateToLocal() {
  let _columnsState = columnsState.value
  // 兼容 string
  if (typeof _columnsState === 'string') {
    try {
      _columnsState = JSON.parse(_columnsState)
    } catch (error) {
      console.error(error)
    }
  }

  if (!Array.isArray(_columnsState)) return // 处理错误格式
  _columnsState.forEach(({ label, visible }) => {
    const column = columns.value.find(item => item.label === label)
    column && !column.disabled && (column.visible = visible)
  })
}

// defaultColumns 初始化完成后，合并到 columns
nextTick(() => {
  columns.value = defaultColumns.map(col => ({
    ...col,
    visible: columns.value.find(item => item.label === col.label)?.visible ?? col.visible,
  }))

  columnsStateToLocal() // 兼容 columnsState 为直接赋值的非响应式对象的时候
})
</script>

<style lang="scss" scoped>
.custom-el-table-wrap {
  position: relative;
}
</style>
