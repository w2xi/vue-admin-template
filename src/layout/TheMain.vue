<template>
  <el-container class="is-vertical">
    <el-main>
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="keepAliveViews">
          <router-view v-if="isRouterAlive" :key="$route.fullPath"></router-view>
        </keep-alive>
      </transition>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data(){
    return {
      isRouterAlive: true,
      keepAliveViews: [],
    }
  },
  
  computed: {
    menuTitle(){
      const suffix = this.$route.params.title || ''
      return `${this.$route.meta.title} ${suffix}`
    },
  },

  watch: {
    $route: {
      handler(to, from) {
        const keepAliveViews = this.keepAliveViews
        const index = keepAliveViews.indexOf(to.name)

        if (index === -1) {
          this.keepAliveViews.push(to.name)
        } else {
          const fromIndex = keepAliveViews.indexOf(from.name)
          this.keepAliveViews.splice(fromIndex, 1)
        }
      },
      immediate: true,
    },
  },
}

</script>

<style lang="scss" scoped>
.el-main {
  height: calc(100vh - 80px - 61px);
  background: #f5f5f5;
  color: #333;
  border-radius: 6px;
  padding: 15px;
}
</style>
