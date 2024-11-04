<!-- 对 el-table 和 el-table-column 进行了二次封装，说明如下
  1.已集成到此项目，组件名仍为 el-table 和 el-table-column 保持不变。直接使用默认会替换掉 element-plus 库的 el-table 和 el-table-column。
  2.el-table-column 新增支持 visible 属性，用于开启"显隐列"功能。
    - 此外 visible 还可以指定一个初始值，类型为 boolean。（例如：:visible='false' 表示初始状态为隐藏。如果初始值不指定 默认为 true） 
  3.el-table 新增支持 columnsState 属性，columnsStateChange 方法。用于设置和捕获显示隐藏状态的变化。
  4.同一url下，如果有多个表格开启了显示隐藏列，需要给 el-table 额外指定 name 属性加以区分。
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

const props = defineProps({
  columnsState: [Array, String],
  name: String,
})
const { columnsState } = toRefs(props)
const emit = defineEmits(['columnsStateChange'])

const columnsStorage = useStorage(`columnsStorage:${location.href}-${props.name}`, [])

const tableRef = ref()
const defaultColumns = reactive([]) // 默认设置
provide('defaultColumns', defaultColumns)
provide('name', props.name)

// 防止页面闪烁
watch(columnsStorage, () => nextTick(() => tableRef.value.doLayout()))

// 将本地数据同步到外面
function handleCheckboxChange() {
  emit('columnsStateChange', columnsStorage.value)
}

// 将外部数据同步到本地
watch(columnsState, () => columnsStateToStorage())

function columnsStateToStorage() {
  // 兼容 string
  if (typeof columnsState.value === 'string') {
    try {
      columnsState.value = JSON.parse(columnsState.value)
    } catch (error) {
      console.error(error)
    }
  }

  if (!Array.isArray(columnsState.value)) return // 处理错误格式
  columnsState.value.forEach(({ label, visible }) => {
    const column = columnsStorage.value.find(item => item.label === label)
    column && !column.disabled && (column.visible = visible)
  })
}

// defaultColumns 初始化完成后，合并到 columnsStorage
nextTick(() => {
  // 优化：当前表格未开启显示隐藏列功能时不做处理。防止污染未命名表格的 Storage。这样当同页面只有一个表格开启了显示隐藏列时，即使有多表格也无需给表格命名。
  if (defaultColumns.every(item => item.disabled === true)) return

  columnsStorage.value = defaultColumns.map(col => ({
    ...col,
    visible: columnsStorage.value.find(item => item.label === col.label)?.visible ?? col.visible,
  }))

  columnsStateToStorage() // 兼容 columnsState 为直接赋值的非响应式对象的时候
})
</script>

<style lang="scss" scoped>
.custom-el-table-wrap {
  position: relative;
}
</style>
