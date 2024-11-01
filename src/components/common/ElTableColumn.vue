<template>
  <el-table-column v-bind="$attrs" v-if="show">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </el-table-column>
</template>

<script setup name="CustomElTableColumn">
import { ElTableColumn } from 'element-plus'

const attrs = useAttrs()
const props = defineProps({
  visible: {
    type: Boolean,
    default: undefined,
  },
})
const defaultColumns = inject('defaultColumns')
const columnsStorage = useStorage(`columnsStorage:${useRoute().path}-${inject('name')}`, [])

// 控制本列的显示隐藏
const show = computed(() =>
  props.visible === undefined
    ? true
    : columnsStorage.value.find(item => item.key === attrs.label)?.visible,
)

// 设置默认值
defaultColumns.push({
  key: attrs.label,
  label: attrs.label,
  visible: props.visible === undefined ? true : props.visible,
  disabled: props.visible === undefined,
})
</script>

<style lang="scss" scoped></style>
