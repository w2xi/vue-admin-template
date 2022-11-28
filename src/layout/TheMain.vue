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

<style scoped>

.menu-title {
  font-size: 16px;
  line-height: 30px;
  margin: 20px 0 0 20px;
  padding-bottom: 10px;
  /* border-bottom: 1px solid #ddd; */
}
.link {
  font-size: 14px;
  margin-left: 10px;
  color: #4193ff;
  text-decoration: underline;
}

.el-main {
  overflow-x: hidden;
  background: #fff;
  color: #333;
  margin: 15px 0 13px 18px;
  border-radius: 6px;
  padding:0 !important;
}
</style>
