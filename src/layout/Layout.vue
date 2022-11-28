<template>
  <el-container>
    <the-aside></the-aside>
    <el-container class="is-vertical">
      <the-header></the-header>
      <the-main></the-main>
    </el-container>
  </el-container>
</template>

<script>
import TheHeader from './TheHeader.vue'
import TheAside from './TheAside.vue'
import TheMain from './TheMain.vue'

export default {
  components: {
    TheHeader,
    TheAside,
    TheMain,
  },
};
</script>

<style scoped>

.el-container {
  height: 100%;
}
</style>
