<template>
  <el-table-column v-bind="$attrs" v-if="show">
    <template v-for="(_, name) in $slots" #[name]="slotprops">
      <slot :name="name" v-bind="slotprops" />
    </template>
  </el-table-column>
</template>

<script setup name="CustomElTableColumn">
import { ElTableColumn } from 'element-plus'
import { watch } from 'vue'

const attrs = useAttrs()
const props = defineProps({
  visible: {
    type: Boolean,
    default: undefined,
  },
})
const columnsVisible = inject('columnsVisible')
const route = useRoute()

// 控制列的显示隐藏
const visibleStorage = useStorage('visibleStorage:' + route.path, {})
const key = Symbol('columnKey')
const show = computed(() =>
  props.visible === undefined
    ? true
    : columnsVisible.find(item => item.key === key)?.visible,
)
props.visible !== undefined &&
  columnsVisible.push({
    key: key,
    label: attrs.label,
    visible: visibleStorage.value[attrs.label] ?? props.visible, // 初始值
  })

// 本地存储
watch(show, n => {
  visibleStorage.value[attrs.label] = n
})
</script>

<style lang="scss" scoped></style>
