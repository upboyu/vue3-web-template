<!-- 对 el-table 和 el-table-column 进行了二次封装，说明如下
  1.已集成到此项目，组件名仍为 el-table 和 el-table-column 保持不变。直接使用默认会替换掉 element-plus 库的 el-table 和 el-table-column。
  2.el-table-column 新增支持 visible 属性，用于开启"显隐列"功能。
    a.此外 还可以指定一个初始值，类型为 boolean。（例如：:visible='false' 表示初始状态为隐藏。初始值不指定 默认为 true）
    b.状态支持本地存储
  3.el-table 新增支持 columnsState 属性， columnsStateChange 方法。用于设置和捕获显示隐藏状态的变化。
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
const columnsStorage = useStorage('columnsStorage:' + useRoute().path, [])
const props = defineProps({
  columnsState: {
    type: Array,
    default: [],
  },
})
const { columnsState } = toRefs(props)
const emit = defineEmits(['columnsStateChange'])

const tableRef = ref()
const defaultColumns = reactive([]) // 默认值
provide('defaultColumns', defaultColumns)

// 防止页面闪烁
watch(columnsStorage, n => {
  nextTick(() => {
    tableRef.value.doLayout()
  })
})

// 将本地数据同步到外面
function handleCheckboxChange() {
  emit('columnsStateChange', columnsStorage.value)
}

// 将外部数据同步到本地
watch(columnsState, n => {
  columnsStateToStorage()
})
function columnsStateToStorage() {
  // 兼容 string
  if (typeof columnsState.value === 'string') {
    try {
      columnsState.value = JSON.parse(columnsState.value)
    } catch (error) {
      columnsState.value = []
    }
  }

  if (!Array.isArray(columnsState.value)) return // 处理错误格式
  columnsState.value.forEach(({ label, visible }) => {
    const column = columnsStorage.value.find(item => item.label === label)
    !column.disabled && (column.visible = visible)
  })
}

// defaultColumns 初始化完成后，合并到 columnsStorage
nextTick(() => {
  const resultColumns = JSON.parse(JSON.stringify(defaultColumns))
  columnsStorage.value.forEach(column => {
    const target = resultColumns.find(item => item.label === column.label)
    target.visible = column.visible
  })
  columnsStorage.value = resultColumns

  columnsStateToStorage() // 兼容 columnsState 为直接赋值的非响应式对象的时候
})
</script>

<style lang="scss" scoped>
.custom-el-table-wrap {
  position: relative;
}
</style>
