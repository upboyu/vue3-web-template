<template>
  <div class="top-right-btn">
    <el-tooltip
      effect="dark"
      content="显隐列"
      placement="top"
      v-if="columns.length"
    >
      <el-dropdown trigger="click" :hide-on-click="false">
        <el-button circle :icon="Operation" />
        <template #dropdown>
          <el-dropdown-menu>
            <template v-for="item in columns" :key="item.key">
              <el-dropdown-item>
                <el-checkbox
                  :checked="item.visible"
                  @change="checkboxChange($event, item.label)"
                  :label="item.label"
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
import { Operation } from '@element-plus/icons-vue'

const props = defineProps({
  columns: {
    type: Array,
  },
})

// 勾选
function checkboxChange(event, label) {
  props.columns.find(item => item.label == label).visible = event
}
</script>

<style lang="scss" scoped>
.top-right-btn {
  position: absolute;
  top: -33px;
  right: 0;
  z-index: 999;
}
</style>
