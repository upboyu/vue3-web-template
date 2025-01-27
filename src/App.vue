<template>
  <div class="wrap">
    <header>
      <RouterLink to="/">
        <el-link target="_blank">Home </el-link>
      </RouterLink>
      <RouterLink to="/about">
        <el-link target="_blank">About </el-link>
      </RouterLink>
    </header>

    <RouterView />
  </div>
</template>
<script setup>
storageToken()
</script>

<style lang="scss" scoped>
.wrap {
  padding: 0 20px;
  header {
    text-align: center;
    .router-link-active .el-link {
      color: var(--el-color-primary);
    }
    .el-link {
      margin-right: 8px;
      margin-top: 30px;
      margin-bottom: 30px;
    }
  }
}
</style>
