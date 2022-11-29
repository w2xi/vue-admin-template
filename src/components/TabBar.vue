<template>
  <div>
    <el-tabs
      v-model="activedTab"
      type="card"
      class="tabs-bar-container"
      @tab-remove="handleTabRemove"
      @tab-click="handleTabClick"
    >
      <el-tab-pane
        v-for="item of visitedRoutes"
        :key="item.path"
        :name="item.path"
        :closable="!isAffix(item)"
      >
        <template #label>
          <span class="icon-wrapper">
            <i :class="item.meta.icon"></i>
          </span>
          <span class="tab-item-title">{{ item.name }}</span>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { constantRoutes } from '@/router'

export default {
  data() {
    return {
      activedTab: '',
      affixtabs: [],
      visible: false,
    }
  },

  watch: {
    '$route': {
      handler(to) {
        console.log(this.visitedRoutes);
        
        this.initTabs()
        this.addTabs()
        const result = this.visitedRoutes?.find((item) => item.path === to.path)
        result && (this.activedTab = to.path)
      },
      immediate: true,
    }
  },

  computed: {
    visitedRoutes() {
      return this.$store.state.visitedRoutes
    }
  },

  methods: {
    filterFixedTabs(routes) {
      let tabs = [];
      routes.forEach((route) => {
        if (route.meta && route.meta.affix) {
          tabs.push({
            fullPath: route.path,
            path: route.path,
            name: route.name,
            meta: { ...route.meta },
          });
        }
        if (route.children) {
          const tempTabs = this.filterFixedTabs(route.children, route.path);
          if (tempTabs.length >= 1) {
            tabs = [...tabs, ...tempTabs];
          }
        }
      });
      return tabs;
    },

    initTabs() {
      let affixtabs = (this.affixtabs = this.filterFixedTabs(constantRoutes));
      for (const tag of affixtabs) {
        if (tag.name) {
          this.$store.commit('ADD_VISITED_ROUTE', tag)
        }
      }
    },

    addTabs() {
      this.$store.commit('ADD_VISITED_ROUTE', this.$route)
    },

    handleTabRemove(path) {
      const index = this.visitedRoutes.findIndex(item => item.path === path)
      const removedRoute = { ...this.visitedRoutes[index] }

      this.$store.commit('REMVOE_VISITED_ROUTE', index)

      if (removedRoute) {
        this.$router.push(this.visitedRoutes.at(-1))
      } else {
        this.$router.push('/')
      }
    },

    handleTabClick(tab) {
      const route = this.visitedRoutes[tab.index];

      if (this.$route.path !== route.path) {
        this.$router.push({
          path: route.path,
          query: route.query,
          fullPath: route.fullPath,
        });
      }
    },

    isAffix(tag) {
      return tag.meta && tag.meta.affix
    }
  }
}

</script>

<style lang="scss" scoped>
.tabs-bar-container {
  height: 55px;
  padding: 3px 15px;
}
.el-tabs :deep(.el-tabs__header) {
  border: none;
  box-sizing: border-box;
  .el-tabs__nav {
    border: none;
    box-sizing: border-box;
  }
  .el-tabs__item + .el-tabs__item {
    margin-left: 6px;
  }
  .el-tabs__item {
    border-radius: 2px;
    box-sizing: border-box;
    border: none;
  }
  .el-tabs__item.is-active, .el-tabs__item:hover {
    color: #7e9cff;
    background-color: #f2f5ff;
    border-bottom: 2px solid #7e9cff;
    border-radius: 2px;
    border-bottom-color: #7e9cff;
    border-bottom: 2px solid #7e9cff;
  } 
}
.icon-wrapper {
  position: relative;
  .el-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
}
.tab-item-title {
  margin-left: 5px;
}
</style>