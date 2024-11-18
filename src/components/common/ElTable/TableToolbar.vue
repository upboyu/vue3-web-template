<template>
  <div class="table-top-right-btn">
    <el-tooltip effect="dark" content="自定义列" placement="top" v-if="show">
      <el-dropdown ref="dropdownRef" trigger="click" :hide-on-click="false" size="small">
        <el-button circle :icon="Operation" size="small" />
        <template #dropdown>
          <el-dropdown-menu>
            <template v-for="item in columns" :key="item.label">
              <el-dropdown-item>
                <el-checkbox
                  v-model="item.visible"
                  @change="checkboxChange($event, item.label)"
                  :label="item.label"
                  :disabled="item.disabled"
                  size="small"
                />
              </el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-tooltip>
  </div>
</template>

<script setup>
import { inject, computed, ref } from 'vue'
import {
  ElTooltip,
  ElDropdown,
  ElButton,
  ElDropdownMenu,
  ElDropdownItem,
  ElCheckbox,
} from 'element-plus'
import { useEventListener } from '@vueuse/core'

import { Operation } from '@element-plus/icons-vue'

const emit = defineEmits(['checkboxChange'])
const columns = inject('columns')
const show = computed(() => columns.value.find((item) => item.disabled === false))

function checkboxChange(event, label) {
  columns.value.find((item) => item.label == label).visible = event
  emit('checkboxChange')
}

const dropdownRef = ref()
useEventListener('resize', () => {
  dropdownRef.value?.handleClose?.()
})
</script>

<style lang="scss" scoped>
.table-top-right-btn {
  position: absolute;
  top: -33px;
  right: 0;
  z-index: 999;
}
</style>
