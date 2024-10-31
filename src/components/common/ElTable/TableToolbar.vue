<template>
  <div class="top-right-btn">
    <el-tooltip effect="dark" content="显隐列" placement="top" v-if="show">
      <el-dropdown trigger="click" :hide-on-click="false">
        <el-button circle :icon="Operation" />
        <template #dropdown>
          <el-dropdown-menu>
            <template v-for="item in columnsStorage" :key="item.key">
              <el-dropdown-item>
                <el-checkbox
                  v-model="item.visible"
                  @change="checkboxChange($event, item.label)"
                  :label="item.label"
                  :disabled="item.disabled"
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
const emit = defineEmits(['checkboxChange'])
const columnsStorage = useStorage('columnsStorage:' + useRoute().path, [])
const show = computed(() =>
  columnsStorage.value.find(item => item.disabled === false),
)

// 勾选
function checkboxChange(event, label) {
  columnsStorage.value.find(item => item.label == label).visible = event
  emit('checkboxChange')
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
